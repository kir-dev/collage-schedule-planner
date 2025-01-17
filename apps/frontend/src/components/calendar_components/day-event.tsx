import { Event } from './event-dto';

interface DayEventProps {
  event: Event;
  onEventClick: (id: number) => void;
}

export default function DayEvent(props: DayEventProps) {
  const startDate = new Date(props.event.startTime);
  const endDate = new Date(props.event.endTime);
  return (
    <div className='absolute m-1' style={{ marginTop: `${startDate.getMinutes() / 1.5}px` }}>
      <div
        className='flex flex-row bg-blue-900 justify-start max-w-[140px] overflow-auto scrollbar-webkit rounded-lg'
        style={{
          height: `${((endDate.getHours() - startDate.getHours()) * 60 + endDate.getMinutes() - startDate.getMinutes()) / 1.5}px`,
        }}
      >
        <div className='bg-black border-5 w-[3px] my-1' />
        <button
          className='flex bg-transparent rounded px-1 max-w-max hover:bg-eventHover'
          onClick={() => props.onEventClick(props.event.id)}
        >
          <div className='flex flex-col'>
            <p className='self-start'>{props.event.name}</p>
            <p className='self-start text-xs'>{props.event.description}</p>
            <p className='self-start text-xs'>{props.event.location}</p>
          </div>
        </button>
      </div>
    </div>
  );
}
