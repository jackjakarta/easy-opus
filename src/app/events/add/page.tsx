'use server';

import React from 'react';
import EventForm from './add-event-form';
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  return (
    <div>
      <h1 className='text-lg text-center font-bold mb-5'>Add New Event</h1>
      {user?.id && <EventForm userId={user.id} />}
    </div>
  );
};
