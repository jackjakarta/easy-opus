ALTER TABLE "attendees" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;