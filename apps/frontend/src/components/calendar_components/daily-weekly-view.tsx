import { useState } from 'react';

import DailyViewWO from './daily-view-without-date';
import { Event } from './event-dto';

interface DWViewProps {
  events: Event[];
  onEventClick: (id: number) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export default function DWView(props: DWViewProps) {
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(
    new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), props.currentDate.getDay()).getDay()
  );

  const handlePreviousWeek = () => {
    props.setCurrentDate(
      new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), props.currentDate.getDate() - 7)
    );
    setFirstDayOfWeek((firstDayOfWeek + 7) % 7);
  };
  const handleNextWeek = () => {
    props.setCurrentDate(
      new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), props.currentDate.getDate() + 7)
    );
    setFirstDayOfWeek((firstDayOfWeek + 7) % 7);
  };

  const daysInMonth = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() + 1, 0).getDate();
  const daysInLastMonth = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), 0).getDate();
  const dayOfWeek = new Date(
    props.currentDate.getFullYear(),
    props.currentDate.getMonth(),
    props.currentDate.getDate()
  ).getDay();

  return (
    <div className='flex items-center justify-center '>
      <div className='bg-background shadow-lg bg-calendarBg bg-opacity-80 text-white'>
        <div className='flex items-center justify-between text-primary-foreground rounded-t-lg'>
          <button
            onClick={handlePreviousWeek}
            className='p-2 rounded-full hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground'
          >
            <ChevronLeftIcon className='w-5 h-5' />
          </button>
          <div className='text-lg font-medium'>
            {props.currentDate.toLocaleString('hu', { month: 'long' })} {props.currentDate.getFullYear()}{' '}
          </div>
          <button
            onClick={handleNextWeek}
            className='p-2 rounded-full hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground'
          >
            <ChevronRightIcon className='w-5 h-5' />
          </button>
        </div>

        <div className='grid grid-cols-8'>
          {['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className='flex items-center justify-center h-16 font-medium text-muted-foreground'>
              {day}
            </div>
          ))}
          <div className='grid grid-cols-subgrid'>
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className='cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary px-2 border-white border-t-2 border-opacity-50'
              >
                <div className='flex flex-col'>
                  <span className='self-start text-sm'>{i}:00</span>
                </div>
              </div>
            ))}
          </div>

          {Array.from({ length: dayOfWeek }, (_, i) => i).map((_) => {
            return (
              <div
                key={_}
                className={`cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  dayOfWeek === _ + 1 ? 'text-primary-foreground font-medium font-bold font-lg' : ''
                }`}
              >
                {props.currentDate.getDate() - dayOfWeek + _ >= 0 ? (
                  <DailyViewWO
                    currentDate={
                      new Date(
                        props.currentDate.getFullYear(),
                        props.currentDate.getMonth(),
                        props.currentDate.getDate() - dayOfWeek + _ + 1
                      )
                    }
                    setCurrentDate={props.setCurrentDate}
                    events={props.events}
                    onEventClick={props.onEventClick}
                  />
                ) : (
                  <DailyViewWO
                    currentDate={
                      new Date(
                        props.currentDate.getFullYear(),
                        props.currentDate.getMonth() - 1,
                        props.currentDate.getDate() - dayOfWeek + _ + daysInLastMonth + 1
                      )
                    }
                    setCurrentDate={props.setCurrentDate}
                    events={props.events}
                    onEventClick={props.onEventClick}
                  />
                )}
              </div>
            );
          })}

          {Array.from({ length: 7 - dayOfWeek }, (_, i) => i + 1).map((_) => (
            <div
              key={_}
              className='cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
              style={{ width: '14.28%' }}
            >
              {props.currentDate.getDate() + _ > daysInMonth ? (
                <DailyViewWO
                  currentDate={
                    new Date(
                      props.currentDate.getFullYear(),
                      props.currentDate.getMonth() + 1,
                      props.currentDate.getDate() - dayOfWeek + _ + 1
                    )
                  }
                  setCurrentDate={props.setCurrentDate}
                  events={props.events}
                  onEventClick={props.onEventClick}
                />
              ) : (
                <DailyViewWO
                  currentDate={
                    new Date(
                      props.currentDate.getFullYear(),
                      props.currentDate.getMonth(),
                      props.currentDate.getDate() + _
                    )
                  }
                  setCurrentDate={props.setCurrentDate}
                  events={props.events}
                  onEventClick={props.onEventClick}
                />
              )}
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
