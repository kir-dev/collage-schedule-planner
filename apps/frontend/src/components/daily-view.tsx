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
    <div className='flex items-center justify-center my-16'>
      <div className='flex flex-col'>
        <button
          onClick={handlePreviousDay}
          className='m-1 border-2 border-black bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg'
        >
          {'<'}
        </button>
        <button
          onClick={handleNextDay}
          className='m-1 border-2 border-black bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg'
        >
          {'>'}
        </button>
      </div>
      <div className='shadow-lg w-[500px] border-black border-2'>
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className='cursor-pointer hover:bg-gray-200 focus:outline-none focus-visible:ring-2 min-h-10 focus-visible:ring-primary border p-2'
          >
            <div className='flex flex-col'>
              <span className='self-start text-sm'>{i}:00</span>
            </div>
            <div className='overflow-auto ml-10'>
              {props.events.map((event, index) => {
                const eventStartDate = new Date(event.startDate);
                const eventEndDate = new Date(event.endDate);
                const length = new Date(event.endTime).getHours() - new Date(event.startTime).getHours();
                const eventsInHour = props.events.filter(
                  (e) =>
                    new Date(e.startTime).getHours() <= i &&
                    new Date(e.endTime).getHours() >= i &&
                    new Date(e.startDate).getDate() <= props.currentDate.getDate() &&
                    new Date(e.endDate).getDate() >= props.currentDate.getDate() &&
                    new Date(e.startDate).getMonth() === props.currentDate.getMonth() &&
                    new Date(e.startDate).getFullYear() === props.currentDate.getFullYear()
                );
                if (
                  new Date(event.startTime).getHours() === i &&
                  eventStartDate.getDate() <= props.currentDate.getDate() &&
                  eventEndDate.getDate() >= props.currentDate.getDate() &&
                  eventStartDate.getMonth() === props.currentDate.getMonth() &&
                  eventStartDate.getFullYear() === props.currentDate.getFullYear()
                ) {
                  return (
                    <div key={event.id} className='absolute'>
                      <div key={event.id} className='absolute bg-transparent bg-opacity-0'>
                        <button
                          key={event.id}
                          className='m-1 self-center mt-1 bg-gray-300 rounded px-1 min-w-28 max-w-fit hover:bg-gray-400 border-2 border-black'
                          onClick={() => props.onEventClick(event.id)}
                          style={{
                            height: `${length * 40 + 40}px`,
                            width: '100px',
                            marginLeft: `${(eventsInHour.length - index) * 100}px`,
                          }}
                        >
                          <p className='absolute top-2 right-2'>{event.name}</p>
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
              <span className='self-center' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
