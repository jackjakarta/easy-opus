'use server'

import React from 'react';
import EventForm from './add-event-form';

export default async function Page() {
  return (
    <div>
      <h1>Add New Event</h1>
      <EventForm />
    </div>
  );
};
