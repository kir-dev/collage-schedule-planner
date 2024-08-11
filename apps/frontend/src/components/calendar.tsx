'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { Event } from './event-dto';

const url = 'http://localhost:3001/event';

export default function Calendar() {
  const [isAdd, setIsAdd] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const onClick = () => {
    setInputValue('');
    setDate(new Date(currentDate));
    axios.post(url, { name: inputValue, startDate: date }).then(() => {
      onGetData();
    });
    setIsAdd(!isAdd);
  };
  const onGetData = () => {
    axios.get<Event[]>(url).then((res) => {
      setEvents(res.data);
    });
  };

  const onAddEvent = () => {
    setIsAdd(!isAdd);
  };

  useEffect(() => {
    onGetData();
  }, []);
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const today = new Date();
  return (
    <>
      <div className='fixed top-8 right-0 m-2'>
        {isAdd ? (
          <>
            <input
              className='mt-10 border-2 border-black rounded-lg p-2'
              type='date'
              value={date.toISOString()}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
            <input
              className='mt-10 border-2 border-black rounded-lg p-2 max-w-fit'
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className='border-2 border-black mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
              onClick={onClick}
            >
              {' '}
              Add{' '}
            </button>
          </>
        ) : (
          <button
            className='border-2 border-black mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
            onClick={onAddEvent}
          >
            {' '}
            +{' '}
          </button>
        )}
      </div>
      <div className='flex items-center justify-center h-screen'>
        <div className='bg-background rounded-lg shadow-lg w-[1000px]'>
          <div className='flex items-center justify-between bg-primary text-primary-foreground p-4 rounded-t-lg'>
            <button
              onClick={handlePreviousMonth}
              className='p-2 rounded-full hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground'
            >
              <ChevronLeftIcon className='w-5 h-5' />
            </button>
            <div className='text-lg font-medium'>
              {currentDate.toLocaleString('hu', { month: 'long' })} {currentDate.getFullYear()}{' '}
            </div>
            <button
              onClick={handleNextMonth}
              className='p-2 rounded-full hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground'
            >
              <ChevronRightIcon className='w-5 h-5' />
            </button>
          </div>
          <div className='grid grid-cols-7 p-2'>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className='flex items-center justify-center h-16 font-medium text-muted-foreground border'>
                {day}
              </div>
            ))}

            {Array.from({ length: firstDayOfMonth }, (_, i) => i).map((_) => (
              <div key={_} className='h-20 border' />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`h-20 cursor-pointer hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary border p-2 ${
                  today.getDate() === day &&
                  today.getMonth() === currentDate.getMonth() &&
                  today.getFullYear() === currentDate.getFullYear()
                    ? 'bg-primary text-primary-foreground font-medium font-bold font-lg'
                    : ''
                }`}
              >
                <div className='flex flex-col'>
                  <span className='self-end'>{day}</span>
                  <div className='flex flex-col items-center self-start'>
                    <div className='bg-secondary text-secondary-foreground rounded-md text-xs overflow50-auto max-h-12 max-w-28'>
                      {events.map((event) => {
                        const eventDate = new Date(event.startDate);
                        return (
                          <p key={event.id} className='bg-green-400 rounded px-1 my-1 min-w-28 max-w-fit'>
                            {eventDate.getDate() === day &&
                            eventDate.getMonth() === currentDate.getMonth() &&
                            eventDate.getFullYear() === currentDate.getFullYear()
                              ? event.name
                              : ''}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ChevronLeftIcon(props) {
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
      <path d='m15 18-6-6 6-6' />
    </svg>
  );
}

function ChevronRightIcon(props) {
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
      <path d='m9 18 6-6-6-6' />
    </svg>
  );
}
