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
        <div className="mx-auto max-w-4xl mt-10 p-4">
            <p className="text-lg font-semibold text-gray-800">{event.name} - {event.date.getDate()}.{event.date.getMonth() + 1}.{event.date.getFullYear()}</p>
            <div className="flex justify-center space-x-3 mt-5">
                <Link href={`/events/${event.id}/edit`} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors" >
                    Edit Event
                </Link>
                <DeleteEventButton eventId={event.id} />
            </div>
            <h2 className="text-xl font-bold text-center text-gray-800 mt-8 mb-3">Event Attendees</h2>
            <ul className="mt-1 space-y-2">
                {eventAttendees.map((attendee) => (
                    <li key={attendee.id} className="p-3 bg-white shadow rounded-lg">
                        <b className="text-gray-900">{attendee.name}</b> - <span className="text-gray-600">{attendee.email}</span> - <DeleteAttendeeButton attendeeId={attendee.id} />
                    </li>
                ))}
            </ul>
            <div className="mt-8">
                <h2 className="text-xl font-bold text-center text-gray-800 mb-3">Add Attendees</h2>
                <AddAttendeeForm eventId={event.id} />
            </div>
        </div>
    );
};
