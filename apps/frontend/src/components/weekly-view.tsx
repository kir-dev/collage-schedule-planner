import { useState } from 'react';

import { Event } from './event-dto';

interface WeeklyViewProps {
  events: Event[];
  onEventClick: (id: number) => void;
}

export default function WeeklyView(props: WeeklyViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events } = props;
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay()).getDay()
  );

  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    setFirstDayOfWeek((firstDayOfWeek + 7) % 7);
  };
  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    setFirstDayOfWeek((firstDayOfWeek + 7) % 7);
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const dayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getDay();

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-background rounded-lg shadow-lg w-[1000px]'>
        <div className='flex items-center justify-between bg-gray-500 text-primary-foreground p-4 rounded-t-lg'>
          <button
            onClick={handlePreviousWeek}
            className='p-2 rounded-full hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground'
          >
            <ChevronLeftIcon className='w-5 h-5' />
          </button>
          <div className='text-lg font-medium'>
            {currentDate.toLocaleString('hu', { month: 'long' })} {currentDate.getFullYear()}{' '}
          </div>
          <button
            onClick={handleNextWeek}
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

          {Array.from({ length: dayOfWeek }, (_, i) => i).map((_) => {
            return (
              <div
                key={_}
                className={`h-20 cursor-pointer hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary border p-2 ${
                  dayOfWeek === _ + 1 ? 'bg-gray-500 text-primary-foreground font-medium font-bold font-lg' : ''
                }`}
              >
                <div className='flex flex-col'>
                  <span className='self-end'>{currentDate.getDate() - dayOfWeek + _ + 1}</span>
                  <div>
                    {events.map((event) => {
                      const day = currentDate.getDate() - dayOfWeek + _ + 1;
                      const eventStartDate = new Date(event.startDate);
                      const eventEndDate = new Date(event.endDate);
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
                            onClick={() => props.onEventClick(event.id)}
                          >
                            {event.name}
                          </button>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {Array.from({ length: 7 - dayOfWeek }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className='h-20 cursor-pointer hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary border p-2'
            >
              <div className='flex flex-col'>
                {currentDate.getDate() + day > daysInMonth ? (
                  <div>
                    <span className='self-end'>{currentDate.getDate() + day - daysInMonth}</span>
                    <div>
                      {events.map((event) => {
                        const _ = currentDate.getDate() - dayOfWeek + day + 1;
                        const eventStartDate = new Date(event.startDate);
                        const eventEndDate = new Date(event.endDate);
                        if (
                          eventStartDate.getDate() <= _ &&
                          eventEndDate.getDate() >= _ &&
                          eventStartDate.getMonth() <= currentDate.getMonth() &&
                          eventEndDate.getMonth() >= currentDate.getMonth() &&
                          eventStartDate.getFullYear() === currentDate.getFullYear()
                        ) {
                          return (
                            <button
                              key={event.id}
                              className='mt-1 bg-gray-300 rounded px-1 min-w-28 max-w-fit hover:bg-gray-400'
                              onClick={() => props.onEventClick(event.id)}
                            >
                              {event.name}
                            </button>
                          );
                        }
                      })}
                    </div>
                  </div>
                ) : (
                  <span className='self-end'>{currentDate.getDate() + day}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
