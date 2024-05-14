'use server';

import { dbAddNewEvent } from "@/db/functions/eventsList";

export async function addEvent(formData: FormData, userId: string) {
    const name = formData.get('name') as string;
    const date = new Date(formData.get('date') as string);
    const description = formData.get('description') as string;

    try {
        const result = await dbAddNewEvent(name, date, description, userId);
        return { success: true, name };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};
