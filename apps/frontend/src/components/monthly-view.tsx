import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Event } from './event-dto';

interface MonthlyViewProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  events: Event[];
  onEventClick: (id: number) => void;
}

export default function MonthlyView(props: MonthlyViewProps) {
  const daysInMonth = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), 0).getDay();
  const lastDayOfMonth = 7 - new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() + 1, 0).getDay();
  const daysInLastMonth = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), 0).getDate();
  const today = new Date();

  const handlePreviousMonth = () => {
    props.setCurrentDate(new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    props.setCurrentDate(new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() + 1, 1));
  };

  return (
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
            {props.currentDate.toLocaleString('hu', { month: 'long' })} {props.currentDate.getFullYear()}{' '}
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
            <div key={_} className='flex flex-col h-20 border p-2'>
              <span className='self-end text-gray-400'>{daysInLastMonth - firstDayOfMonth + _ + 1}</span>
            </div>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`h-20 cursor-pointer hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary border p-2 ${
                today.getDate() === day &&
                today.getMonth() === props.currentDate.getMonth() &&
                today.getFullYear() === props.currentDate.getFullYear()
                  ? 'bg-gray-500 text-primary-foreground font-medium font-bold font-lg'
                  : ''
              }`}
            >
              <div className='flex flex-col'>
                <span className='self-end'>{day}</span>
                <div className='flex flex-col items-center self-start'>
                  <div className='bg-secondary text-secondary-foreground rounded-md text-xs overflow-auto scrollbar-webkit max-h-12 max-w-28'>
                    {props.events.map((event) => {
                      const eventStartDate = new Date(event.startDate);
                      const eventEndDate = new Date(event.endDate);
                      if (eventStartDate.getMonth() === eventEndDate.getMonth()) {
                        if (
                          eventStartDate.getDate() <= day &&
                          eventEndDate.getDate() >= day &&
                          eventStartDate.getMonth() <= props.currentDate.getMonth() &&
                          eventEndDate.getMonth() >= props.currentDate.getMonth() &&
                          eventStartDate.getFullYear() === props.currentDate.getFullYear()
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
                      } else if (
                        eventStartDate.getMonth() !== props.currentDate.getMonth() &&
                        eventEndDate.getMonth() !== props.currentDate.getMonth()
                      ) {
                        if (
                          eventStartDate.getMonth() <= props.currentDate.getMonth() &&
                          eventEndDate.getMonth() >= props.currentDate.getMonth() &&
                          eventStartDate.getFullYear() === props.currentDate.getFullYear()
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
                      } else if (
                        (eventStartDate.getDate() <= day &&
                          eventStartDate.getMonth() === props.currentDate.getMonth() &&
                          eventStartDate.getFullYear() === props.currentDate.getFullYear()) ||
                        (eventEndDate.getDate() >= day && eventEndDate.getMonth() === props.currentDate.getMonth())
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
            </div>
          ))}
          {Array.from({ length: lastDayOfMonth }, (_, i) => i).map((_) => (
            <div key={_} className='flex flex-col h-20 border p-2'>
              <span className='self-end text-gray-400'>{_ + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
