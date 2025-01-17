import DayEvent from './day-event';
import { Event } from './event-dto';

interface DailyViewPropsWO {
  events: Event[];
  currentDate: Date;
  onEventClick: (id: number) => void;
  setCurrentDate: (date: Date) => void;
}

export default function DailyViewWO(props: DailyViewPropsWO) {
  return (
    <div className='flex border-5'>
      <div className='flex flex-col bg-transparent text-white'>
        <div className='flex items-center justify-center'>
          <div className='w-[150px]'>
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className='cursor-pointer focus:outline-none focus-visible:ring-2 min-h-10 focus-visible:ring-primary'
              >
                <div
                  key={i}
                  className='cursor-pointer focus:outline-none focus-visible:ring-2 min-h-10 focus-visible:ring-primary p-2 border-white border-t-2 border-l-2 border-opacity-50'
                >
                  <span className='self-start text-sm' />
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
                        <div key={event.id} className=''>
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
