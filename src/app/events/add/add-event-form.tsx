'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addEvent } from './actions';


export default function EventForm({ userId }: {userId: string}) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const result = await addEvent(formData, userId);
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="border-b border-gray-900/10 pb-8">
        {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Add Event</h2> */}
        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Event Title:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description:</label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-x-4">
      <button type="button" className="text-sm font-semibold text-gray-900" onClick={() => router.push('/events')}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        >
          Add Event
        </button>
      </div>
    </form>
  );
};
