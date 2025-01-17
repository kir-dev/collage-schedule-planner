import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import DayEvent from './day-event';
import { Event } from './event-dto';

interface DailyViewProps {
  events: Event[];
  currentDate: Date;
  onEventClick: (id: number) => void;
  setCurrentDate: (date: Date) => void;
}

export default function DailyView(props: DailyViewProps) {
  const handlePreviousDay = () => {
    props.setCurrentDate(
      new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), props.currentDate.getDate() - 1)
    );
  };
  const handleNextDay = () => {
    props.setCurrentDate(
      new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), props.currentDate.getDate() + 1)
    );
  };
  return (
    <div className='flex items-center justify-center bg-transparent'>
      <div className='flex flex-col items-center justify-center bg-calendarBg rounded-lg text-white'>
        <div className='flex items-center justify-between text-primary-foreground p-4 rounded-t-lg'>
          <button
            onClick={handlePreviousDay}
            className='p-2 rounded-full hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground'
          >
            <ChevronLeftIcon className='w-5 h-5' />
          </button>
          <div className='flex text-lg font-medium text-white'>
            {props.currentDate.getDate()} {props.currentDate.toLocaleString('hu', { month: 'long' })}{' '}
            {props.currentDate.getFullYear()}{' '}
          </div>
          <button
            onClick={handleNextDay}
            className='p-2 rounded-full hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground'
          >
            <ChevronRightIcon className='w-5 h-5' />
          </button>
        </div>
        <div className='flex items-center justify-center'>
          <div className='shadow-lg border-black border-2 w-[250px]'>
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className='cursor-pointer focus:outline-none focus-visible:ring-2 min-h-10 focus-visible:ring-primary p-2'
              >
                <div className='flex flex-col'>
                  <span className='self-start text-sm'>{i}:00</span>
                </div>
                <div className='overflow-auto'>
                  {props.events.map((event) => {
                    const eventStartDate = new Date(event.startDate);
                    const eventEndDate = new Date(event.endDate);
                    if (
                      new Date(event.startTime).getHours() === i &&
                      eventStartDate.getDate() <= props.currentDate.getDate() &&
                      eventEndDate.getDate() >= props.currentDate.getDate() &&
                      eventStartDate.getMonth() === props.currentDate.getMonth() &&
                      eventStartDate.getFullYear() === props.currentDate.getFullYear()
                    ) {
                      return (
                        /*<div key={event.id} className='absolute'>
                          <div key={event.id} className=''>
                            <button
                              key={event.id}
                              className='ml-10 self-center bg-transparent rounded px-1 min-w-28 max-w-fit hover:bg-eventHover'
                              onClick={() => props.onEventClick(event.id)}
                            >
                              <p className=''>{event.name}</p>
                            </button>
                          </div>
                        </div>*/
                        <div key={event.id} className='ml-20 m-1'>
                          <DayEvent key={event.id} event={event} onEventClick={props.onEventClick} />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
