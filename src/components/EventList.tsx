'use client'

import { useEffect, useState } from 'react'

interface Event {
  id: string;
  title: string;
  startTime: Date;
  description: string;
  // add other event properties as needed
}

const EventList = ({ dateParam }: { dateParam?: string }) => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`/api/events?date=${dateParam || ''}`)
      const data = await response.json()
      setEvents(data)
    }
    fetchEvents()
  }, [dateParam])

  return Array.isArray(events) ? events.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
    </div>
  )) : null
};

export default EventList;
