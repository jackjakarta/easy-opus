import { pgTable, bigserial, text, timestamp, foreignKey } from "drizzle-orm/pg-core";

export const events = pgTable('events', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: text('event_name').notNull(),
    date: timestamp('event_date').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});


// export const 
