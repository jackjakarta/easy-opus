import { eq } from "drizzle-orm";

import { db, events, attendees, EventRow, AttendeeRow } from "..";


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


export async function dbDeleteEvent(eventId: number): Promise<{ success: boolean }> {
    const event = await db.delete(events).where(eq(events.id, eventId));

    if (event.count === 0) {
        throw new Error('No event with such id!')
    };

    return { success: true };
};


export async function dbGetAttendeesByEventId(eventId: number): Promise<AttendeeRow[]> {
    const attendeesList = await db.select().from(attendees).where(eq(attendees.eventId, eventId));

    if (attendeesList === undefined) {
        throw new Error('No attendees!')
    };

    return attendeesList;
};


export async function dbAddAttendeeToEvent(eventId: number, name: string, email: string) {
    await db.insert(attendees).values({
        eventId: eventId,
        name: name,
        email: email
    });

    return { name };
};


export async function dbDeleteAttendee(attendeeId: number): Promise<{ success: boolean}> {
    const attendee = await db.delete(attendees).where(eq(attendees.id, attendeeId));

    if (attendee.count === 0) {
        throw new Error('No event with such id!')
    };

    return { success: true };
};
