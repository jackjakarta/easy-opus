'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { deleteAttendee } from "./actions";

type DeleteAttendeeButtonProps = {
    attendeeId: number;
};


export const DeleteAttendeeButton: React.FC<DeleteAttendeeButtonProps> = ({ attendeeId }) => {
    const router = useRouter();

    const handleDelete = async () => {
        const result = await deleteAttendee(attendeeId);

        if (result.success) {
            alert('Event deleted!')
            router.refresh();
        } else {
            alert('Failed to delete event.')
        }
    };

    return (
        <button className="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" onClick={handleDelete}>Delete Attendee</button>
    );
};
