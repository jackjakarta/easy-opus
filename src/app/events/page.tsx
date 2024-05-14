import { Metadata } from "next";
import { dbGetEventsList } from "@/db/functions/eventsList";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
    title: "Events",
    description: "Events List Page",
    keywords: "Events, List, Page",
};

export default async function Events() {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId) {
        return <h1>You have to be logged in to see your events.</h1>
    };

    const eventsQs = await dbGetEventsList(userId);

    if (!eventsQs) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-4xl font-bold text-gray-900">Your Events</h1>
                <p className="text-xl mt-3 text-gray-600">No events found.</p>
            </div>
        );
    };

    return (
        <div className="mx-auto max-w-4xl mt-10">
            <h1 className="text-4xl font-bold text-gray-900">{user?.firstName} {user?.lastName}'s Events</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mt-4 mb-5">List of your upcoming events</h2>
            <ul className="space-y-3">
                {eventsQs.map((event) => (
                    <li key={event.id} className="p-3 bg-white shadow rounded-lg">
                        <Link href={`/events/${event.id}`} className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">{event.name}</Link>
                        <p className="text-gray-500">{event.description}</p>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-8">
                <Link className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-colors" href={'/events/add'}>
                    Add New Event
                </Link>
            </div>
        </div>
    );
};
