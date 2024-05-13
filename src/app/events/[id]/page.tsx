import { Metadata } from "next";
import { dbGetEventById, dbGetAttendeesByEventId } from "@/db/functions/eventsList";
import { DeleteEventButton } from "./DeleteEventButton";
import { AttendeeRow } from "@/db";
import AddAttendeeForm from "./AddAttendeeForm";
import { DeleteAttendeeButton } from "./DeleteAttendeeButton";


export const metadata: Metadata = {
    title: "Event Name",
    description: "Single Event Page",
    keywords: "Event, Page",
};


export default async function SingleEvent({ params }: { params: { id: number } }) {
    const event = await dbGetEventById(params.id);
    const eventAttendees = await dbGetAttendeesByEventId(params.id);
    
    return (
        <div>
            <p>{event.name} - {event.date.getDate()}.{event.date.getMonth()}.{event.date.getFullYear()}</p>
            <div className="flex justify-center mt-5">
                <DeleteEventButton eventId={event.id} />
            </div>
            <h2 className="text-center mt-3">Event Attendees</h2>
            <ul className="mt-3">
                {eventAttendees.map((attendee: AttendeeRow) => (
                    <li key={attendee.id}> {attendee.name} - {attendee.email} - <DeleteAttendeeButton attendeeId={attendee.id} /> </li>
                ))}
            </ul>
            <div className="mt-5">
                <h2 className="text-center mt-3">Add Attendees</h2>
                <AddAttendeeForm eventId={params.id} />
            </div>
        </div>
    );
};
