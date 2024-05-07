import { Metadata } from "next";
// import Link from "next/link";

export const metadata: Metadata = {
    title: "Events",
    description: "Events List Page",
    keywords: "Events, List, Page",
};

export default function Events() {
    const events: boolean = false;  // Mock queryset

    if (!events) {
        return (
            <div className="border border-blue-500 size-32 p-2">
                <h1 className="text-3xl font-bold underline font-mono">Events</h1>
                <p>No events found.</p>
            </div>
        );
    };

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Events</h1>
            <p>List of events</p>
            <ul>
                <li>for events in db show events</li>
            </ul>        
        </div>
    );
};
