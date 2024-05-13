'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getEventById, updateEvent } from './actions';

export default function EditEventForm({ eventId }: { eventId: number}) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const data = await getEventById(eventId);
        if (data) {
          setEventData({
            name: data.name,
            date: data.date.toISOString().slice(0, 10),
            description: data.description as string
          });
        } else {
          setErrorMessage('Event not found');
        }
      } catch (error) {
        setErrorMessage('Failed to fetch event data: ');
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const result = await updateEvent(eventId, formData);
      if (result.success) {
        router.push('/events');
      } else {
        setErrorMessage('An error occurred while updating the event.');
      }
    } catch (error: any) {
      setErrorMessage('Failed to process form: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="border-b border-gray-900/10 pb-8">
        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Event Title:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={eventData.name}
              onChange={(e) => setEventData({...eventData, name: e.target.value})}
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
              value={eventData.date}
              onChange={(e) => setEventData({...eventData, date: e.target.value})}
              required
              className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description:</label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={(e) => setEventData({...eventData, description: e.target.value})}
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
          Update Event
        </button>
      </div>
    </form>
  );
};
