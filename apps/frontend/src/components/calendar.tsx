'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { Event } from './event-dto';

const url = 'http://localhost:3001/event';

export default function Calendar() {
  const [isAdd, setIsAdd] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isEventDetails, setIsEventDetails] = useState(false);
  const [clickedEvent, setClickedEvent] = useState<Event | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(clickedEvent?.name);
  const onClick = () => {
    if (inputValue !== '') {
      axios.post(url, { name: inputValue, startDate: startDate, endDate: endDate }).then(() => {
        onGetData();
      });
    }
    setStartDate(new Date(currentDate));
    setEndDate(new Date(currentDate));
    setInputValue('');
    setIsAdd(!isAdd);
  };
  const onGetData = () => {
    axios.get<Event[]>(url).then((res) => {
      setEvents(res.data);
    });
  };

  const onGetName = (id: number) => {
    axios.get(`${url}/${id}`).then((res) => {
      setClickedEvent(res.data);
    });
  };

  const onAddEvent = () => {
    setIsAdd(!isAdd);
  };

  const onEventClick = (id: number) => {
    setIsEventDetails(!isEventDetails);
    setClickedEvent(events.find((event) => event.id === id));
  };

  const onDelete = () => {
    axios.delete(`${url}/${clickedEvent?.id}`).then(() => {
      onGetData();
      setIsEventDetails(!isEventDetails);
    });
  };

  const onEdit = () => {
    if (editValue !== '') {
      if (isEditing) {
        axios.patch(`${url}/${clickedEvent?.id}`, { name: editValue }).then(() => {
          onGetData();
          onGetName(clickedEvent?.id);
        });
      }
    }
    setEditValue(clickedEvent?.name);
    setIsEditing(!isEditing);
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
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDay();
  const today = new Date();
  return (
    <>
      <div className='fixed top-8 right-0 m-2'>
        {isAdd ? (
          <div className='flex flex-col bg-white p-2 rounded-lg border-2 border-black'>
            <button
              className='self-end border-2 border-black bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg'
              onClick={onAddEvent}
            >
              X
            </button>
            <p className='self-start'>
              Start Date:
              <input
                className='mt-3 border-2 border-black rounded-lg p-2'
                type='date'
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
            </p>
            <p className='self-start'>
              End Date:
              <input
                className='mt-3 border-2 border-black rounded-lg p-2'
                type='date'
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
            </p>
            <input
              className='self-center mt-10 border-2 border-black rounded-lg p-2 max-w-fit'
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className='mt-2 border-2 border-black bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg'
              onClick={onClick}
            >
              {' '}
              Add{' '}
            </button>
          </div>
        ) : (
          <button
            className='border-2 border-black mt-10 bg-gray-500 hover:bg-gray-700 font-bold py-2 px-4 rounded-lg'
            onClick={onAddEvent}
          >
            {' '}
            +{' '}
          </button>
        )}
      </div>
      <div className='flex items-center justify-center h-screen'>
        <div className='bg-background rounded-lg shadow-lg w-[1000px]'>
          <div className='flex items-center justify-between bg-gray-500 text-primary-foreground p-4 rounded-t-lg'>
            <button
              onClick={handlePreviousMonth}
              className='p-2 rounded-full hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground'
            >
              <ChevronLeftIcon className='w-5 h-5' />
            </button>
            <div className='text-lg font-medium'>
              {currentDate.toLocaleString('hu', { month: 'long' })} {currentDate.getFullYear()}{' '}
            </div>
            <button
              onClick={handleNextMonth}
              className='p-2 rounded-full hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground'
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
                className={`h-20 cursor-pointer hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary border p-2 ${
                  today.getDate() === day &&
                  today.getMonth() === currentDate.getMonth() &&
                  today.getFullYear() === currentDate.getFullYear()
                    ? 'bg-gray-500 text-primary-foreground font-medium font-bold font-lg'
                    : ''
                }`}
              >
                <div className='flex flex-col'>
                  <span className='self-end'>{day}</span>
                  <div className='flex flex-col items-center self-start'>
                    <div className='bg-secondary text-secondary-foreground rounded-md text-xs overflow-auto max-h-12 max-w-28'>
                      {events.map((event) => {
                        const eventStartDate = new Date(event.startDate);
                        const eventEndDate = new Date(event.endDate);
                        if (eventStartDate.getMonth() === eventEndDate.getMonth()) {
                          if (
                            eventStartDate.getDate() <= day &&
                            eventEndDate.getDate() >= day &&
                            eventStartDate.getMonth() <= currentDate.getMonth() &&
                            eventEndDate.getMonth() >= currentDate.getMonth() &&
                            eventStartDate.getFullYear() === currentDate.getFullYear()
                          ) {
                            return (
                              <button
                                key={event.id}
                                className='mt-1 bg-gray-300 rounded px-1 min-w-28 max-w-fit hover:bg-gray-400'
                                onClick={() => onEventClick(event.id)}
                              >
                                {event.name}
                              </button>
                            );
                          }
                        } else if (
                          eventStartDate.getMonth() !== currentDate.getMonth() &&
                          eventEndDate.getMonth() !== currentDate.getMonth()
                        ) {
                          if (
                            eventStartDate.getMonth() <= currentDate.getMonth() &&
                            eventEndDate.getMonth() >= currentDate.getMonth() &&
                            eventStartDate.getFullYear() === currentDate.getFullYear()
                          ) {
                            return (
                              <button
                                key={event.id}
                                className='mt-1 bg-gray-300 rounded px-1 min-w-28 max-w-fit hover:bg-gray-400'
                                onClick={() => onEventClick(event.id)}
                              >
                                {event.name}
                              </button>
                            );
                          }
                        } else if (
                          (eventStartDate.getDate() <= day &&
                            eventStartDate.getMonth() === currentDate.getMonth() &&
                            eventStartDate.getFullYear() === currentDate.getFullYear()) ||
                          (eventEndDate.getDate() >= day && eventEndDate.getMonth() === currentDate.getMonth())
                        ) {
                          return (
                            <button
                              key={event.id}
                              className='mt-1 bg-gray-300 rounded px-1 min-w-28 max-w-fit hover:bg-gray-400'
                              onClick={() => onEventClick(event.id)}
                            >
                              {event.name}
                            </button>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {isEventDetails ? (
          <div className='flex flex-col fixed top-32 right-0 bg-white rounded-lg border-2 border-black p-6 w-full max-w-sm overflow-auto mr-5'>
            <div className='flex flex-col items-center justify-between mb-4'>
              <button
                className='self-end border-2 border-black bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg'
                onClick={() => {
                  setIsEventDetails(!isEventDetails);
                  setIsEditing(false);
                }}
              >
                X
              </button>
              <h2 className='text-lg font-semibold self-start'>Event details</h2>
            </div>
            <div className='grid gap-4 self-start'>
              <p>Name: {clickedEvent?.name}</p>
              <p>Description: {clickedEvent?.description}</p>
              <p>Location: {clickedEvent?.location}</p>
              <p>Start date: {clickedEvent.startDate}</p>
              <p>End date: {clickedEvent.endDate}</p>
              <p>Priority: {clickedEvent?.priority}</p>
              <p>Status: {clickedEvent?.status}</p>
            </div>
            {isEditing ? (
              <input
                className='self-start mt-10 border-2 border-black rounded-lg p-2 max-w-fit'
                type='text'
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              ''
            )}
            <button
              className='self-end border-2 border-black bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg'
              onClick={() => onDelete()}
            >
              Delete
            </button>
            <button
              className='mt-2 self-end border-2 border-black bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-lg'
              onClick={onEdit}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        ) : (
          ''
        )}
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
