'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { deleteEvent } from "./actions";


type DeleteEventButtonProps = {
    eventId: number;
};


export const DeleteEventButton: React.FC<DeleteEventButtonProps> = ({ eventId }) => {
    const router = useRouter();

    const handleDelete = async () => {
        const result = await deleteEvent(eventId);

        if (result.success) {
            alert('Event deleted!')
            router.push('/events');
        } else {
            alert('Failed to delete event.')
        }
    };

    return (
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" onClick={handleDelete}>Delete Event</button>
    );
};
