'use server';

import { dbDeleteEvent, dbAddAttendeeToEvent, dbDeleteAttendee } from "@/db/functions/eventsList";

export async function deleteEvent(eventId: number) {
    try {
        const result = await dbDeleteEvent(eventId);
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
