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
            <div>
                <h1 className="text-3xl font-bold font-mono mt-2">Events</h1>
                <p>No events found.</p>
            </div>
        );
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mt-2">All Events</h1>
            <h2 className="text-2xl mt-4 mb-2">List of upcoming events</h2>
            <ul className="mt-3">
                {eventsQs.map((event) => (
                    <li key={event.id}> <Link href={`/events/${event.id}`}>{event.name}</Link> - {event.description}</li>
                ))}
            </ul>
            <div className="flex justify-center mt-5">
                <Link className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" href={'/events/add'}>Add New Event</Link>
            </div>
        </div>
    );
};
