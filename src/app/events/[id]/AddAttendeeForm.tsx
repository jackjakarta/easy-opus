'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addAttendee } from './actions';


export default function AddAttendeeForm({ eventId }: { eventId: number}) {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
  
      try {
        const result = await addAttendee(formData, eventId);
        if (result.success) {
        //   router.push(`/events/${eventId}`);
          router.refresh();
        } else {
          setErrorMessage(result.message || 'An error occurred.');
        }
      } catch (error: any) {
        setErrorMessage("Failed to process form: " + error.message);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Attendee
          </button>
        </div>
      </form>
    );
};
