import { eq } from "drizzle-orm";

import { db, events, EventRow } from "..";


export async function dbGetEventsList(): Promise<EventRow[]> {
    const eventsList = await db.select().from(events); 
  
    return eventsList;
};


export async function dbGetEventById(eventId: number): Promise<EventRow> {
    const event = (await db.select().from(events).where(eq(events.id, eventId)))[0];

    if (event === undefined) {
        throw Error(`No Event with ID: ${eventId}`)
    }

    return event;
};


export async function dbAddNewEvent(name: string, date: Date, description: string) {
    await db.insert(events).values({
        name: name,
        date: date,
        description: description
    });

    return { name };
};
