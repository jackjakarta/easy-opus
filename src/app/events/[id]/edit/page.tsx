import EditEventForm from "../EditEventForm";
import { dbGetEventById } from "@/db/functions/eventsList";

export default async function SingleEvent({ params }: { params: { id: number } }) {
    const event = await dbGetEventById(params.id)

    return (
        <div>
            <div className="mt-5">
                <h2 className="text-center mt-3">Edit event details for: <b>{event.name}</b></h2>
                <EditEventForm eventId={event.id} />
            </div>
        </div>
    );
};
