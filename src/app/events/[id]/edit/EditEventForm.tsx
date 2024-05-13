'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { dbGetEventById, dbUpdateEvent } from "@/db/functions/eventsList";


type EditEventFormProps = {
    eventId: number;
};


export const EditEventForm: React.FC<EditEventFormProps> = ({ eventId }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchEvent = async () => {
            const event = await dbGetEventById(eventId);
            setName(event.name);
            setDate(event.date.toISOString().substring(0, 10)); // Format as 'YYYY-MM-DD'
            setDescription(event.description || '');
            setIsLoading(false);
        };

        fetchEvent();
    }, [eventId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedEvent = await dbUpdateEvent(eventId, name, new Date(date), description);
        if (updatedEvent.success) {
            alert('Event updated successfully');
            router.push(`/events/${eventId}`);
        } else {
            alert('Failed to update the event');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Event Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label htmlFor="date">Date:</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />

            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

            <button type="submit">Update Event</button>
        </form>
    );
};