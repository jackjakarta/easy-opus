import { eq } from "drizzle-orm";

import { db, events, EventRow } from "..";


export async function dbGetEventsList(): Promise<EventRow[]> {
    const eventsList = await db.select().from(events); 
  
    return eventsList;
};


export async function dbGetEventById(eventId: number): Promise<EventRow> {
    const event = (await db.select().from(events).where(eq(events.id, eventId)))[0];

    return event;
};
