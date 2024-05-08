'use server';

import { dbDeleteEvent } from "@/db/functions/eventsList";

export async function deleteEvent(eventId: number) {
    try {
        const result = await dbDeleteEvent(eventId);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
