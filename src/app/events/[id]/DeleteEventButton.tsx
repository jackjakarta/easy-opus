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
        <button onClick={handleDelete}>Delete Event</button>
    );
};
