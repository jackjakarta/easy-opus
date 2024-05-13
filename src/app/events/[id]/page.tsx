import { Metadata } from "next";
import { dbGetEventById, dbGetAttendeesByEventId } from "@/db/functions/eventsList";
import { DeleteEventButton } from "./DeleteEventButton";
import { AttendeeRow } from "@/db";
import AddAttendeeForm from "./AddAttendeeForm";
import { DeleteAttendeeButton } from "./DeleteAttendeeButton";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Event Name",
    description: "Single Event Page",
    keywords: "Event, Page",
};


export default async function SingleEvent({ params }: { params: { id: number } }) {
    const event = await dbGetEventById(params.id);
    const eventAttendees = await dbGetAttendeesByEventId(params.id);
    // const router = useRouter();
    
    return (
        <div>
            <p>{event.name} - {event.date.getDate()}.{event.date.getMonth()}.{event.date.getFullYear()}</p>
            <div className="flex justify-center mt-5">
                <Link href={`/events/${event.id}/edit`} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" >Edit Event</Link>
                <DeleteEventButton eventId={event.id} />
            </div>
            <h2 className="text-center mt-3">Event Attendees</h2>
            <ul className="mt-3">
                {eventAttendees.map((attendee: AttendeeRow) => (
                    <li key={attendee.id}> <b>{attendee.name}</b> - {attendee.email} - <DeleteAttendeeButton attendeeId={attendee.id} /> </li>
                ))}
            </ul>
            <div className="mt-5">
                <h2 className="text-center mt-3">Add Attendees</h2>
                <AddAttendeeForm eventId={event.id} />
            </div>
        </div>
    );
};
