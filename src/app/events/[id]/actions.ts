'use server';

import { dbDeleteEvent, dbAddAttendeeToEvent, dbDeleteAttendee, dbUpdateEvent, dbGetEventById } from "@/db/functions/eventsList";


export async function getEventById(eventId: number) {
    const event = await dbGetEventById(eventId);

    return event;
}

export async function deleteEvent(eventId: number) {
    try {
        const result = await dbDeleteEvent(eventId);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};


export async function updateEvent(eventId: number, formData: FormData) {
    const name = formData.get('name') as string;
    const date = new Date(formData.get('date') as string);
    const description = formData.get('description') as string;

    try {
        const result = await dbUpdateEvent(eventId, name, date, description);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};


export async function addAttendee(formData: FormData, eventId: number) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    
    try {
        const result = await dbAddAttendeeToEvent(eventId, name, email);
        return { success: true };
    } catch (error: any) {
        return { success: false, message: error };
    };
};


export async function deleteAttendee(attendeeId: number) {
    try {
        const result = await dbDeleteAttendee(attendeeId);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    };
};
