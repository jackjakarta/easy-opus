'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addEvent } from './actions';


export default function EventForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const result = await addEvent(formData);
      if (result.success) {
        router.push('/events');
      } else {
        setErrorMessage(result.message || 'An error occurred while adding the event.');
      }
    } catch (error: any) {
      setErrorMessage('Failed to process form: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Event Title:</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="date">Date:</label>
      <input type="date" id="date" name="date" required />

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" required></textarea>

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit">Add Event</button>
    </form>
  );
}
