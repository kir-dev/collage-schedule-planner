import { Priority, Status } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const url = 'http://localhost:3001/event';

type Event = {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  priority: Priority;
  status: Status;
  categoryId: number;
  ownerUserId: number;
  ownerGroupId: number;
};

export function Test() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  //const [write, setWrite] = useState('Im here');
  const [events, setEvents] = useState<Event[]>([]);

  const onClick = () => {
    setCount(count + 1);
    axios.post(url, { name: inputValue }).then(() => {
      onGetData();
    });
  };

  const onGetData = () => {
    axios.get<Event[]>(url).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res.data);
      setEvents(res.data);
    });
  };

  useEffect(() => {
    onGetData();
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <button className='mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={onClick}>
        {' '}
        Click me!{' '}
      </button>
      <input className='mt-10' type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button
        className='mt-10 bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded'
        onClick={onGetData}
      >
        Get data!
      </button>
      <div className='overflow-auto max-h-32'>
        {events.map((event) => {
          return <p key={event.id}>{event.name}</p>;
        })}
      </div>
    </div>
  );
}

/*
style={{
                                height: `${length * 40 + 40}px`,
                                width: '100px',
                                marginLeft: `${(eventsInHour.length - index) * 100}px`,
                              }}

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
*/
