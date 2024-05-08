import { Metadata } from "next";
import { dbGetEventById } from "@/db/functions/eventsList";
import { DeleteEventButton } from "./DeleteEventButton";


export const metadata: Metadata = {
    title: "Event Name",
    description: "Single Event Page",
    keywords: "Event, Page",
};


export default async function SingleEvent({ params }: { params: { id: number } }) {
    const event = await dbGetEventById(params.id)
    
    return (
        <div>
            <p>{event.name} - {event.date.getDate()}.{event.date.getMonth()}.{event.date.getFullYear()}</p>
            <div className="flex justify-center mt-5">
                <DeleteEventButton eventId={event.id} />
            </div>
        </div>
    );
};
