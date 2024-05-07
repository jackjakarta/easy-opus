import { Metadata } from "next";
import { dbGetEventsList } from "@/db/functions/eventsList";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Events",
    description: "Events List Page",
    keywords: "Events, List, Page",
};

export default async function Events() {
    const eventsQs = await dbGetEventsList();

    if (!eventsQs) {
        return (
            <div className="border border-blue-500 size-32 p-2">
                <h1 className="text-3xl font-bold font-mono mt-2">Events</h1>
                <p>No events found.</p>
            </div>
        );
    };

    return (
        <div>
            <h1 className="text-3xl font-bold font-mono mt-2">Events</h1>
            <h2 className="text-2xl mt-4 mb-2">List of events</h2>
            <ul>
                {eventsQs.map((event) => (
                    <li key={event.id}> <Link href={`/events/${event.id}`}>{event.name}</Link> - {event.description}</li>
                ))};
            </ul>      
        </div>
    );
};
