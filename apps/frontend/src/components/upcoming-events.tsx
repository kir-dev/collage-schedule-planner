import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Event } from './calendar_components/event-dto';
import { EventItem } from './event-item';

const url = 'http://localhost:3001/event';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const isEventDetails = true;
  const clickedEvent = { name: 'Proba', startDate: '2024-08-19T00:00:00.000Z', endDate: '2024-08-19T00:00:00.000Z' };

  const onGetData = () => {
    axios.get<Event[]>(url).then((res) => {
      setEvents(res.data);
    });
  };

  useEffect(() => {
    onGetData();
  }, []);
  return (
    <div className='fixed top-32 right-0 bg-primary bg-opacity-50 rounded-lg border p-6 w-full max-w-sm overflow-auto mr-5'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold'>Upcoming Events</h2>
        <Link href='#' className='text-primary hover:underline' prefetch={false}>
          View all
        </Link>
      </div>
      {isEventDetails ? (
        <div className='grid gap-4'>
          <p>Name: {clickedEvent.name}</p>
          <p>Start date: {clickedEvent.startDate}</p>
          <p>Start date: {clickedEvent.endDate}</p>
        </div>
      ) : (
        <div className='grid gap-4'>
          <div className='flex items-start gap-4'>
            <div className='overflow-auto max-h-96 text-lg text-left py-2 my-2'>
              {events.map((event) => {
                return <EventItem key={event.id} event={event} onSave={onGetData} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
/*
function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M8 2v4' />
      <path d='M16 2v4' />
      <rect width='18' height='18' x='3' y='4' rx='2' />
      <path d='M3 10h18' />
    </svg>
  );
}*/
