import { pgTable, bigserial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const events = pgTable('events', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: text('event_name').notNull(),
    date: timestamp('event_date').notNull(),
    description: text('description'),
    userId: text('user_id'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type EventRow = typeof events.$inferSelect;


export const attendees = pgTable('attendees', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    eventId: integer('event_id').references(() => events.id, {
        // onDelete: 'CASCADE', 
        // onUpdate: 'CASCADE'
    }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type AttendeeRow = typeof attendees.$inferSelect;
