import axios from 'axios';
import { useEffect, useState } from 'react';

import { Event } from './calendar_components/event-dto';
import { EventItem } from './event-item';

const url = 'http://localhost:3001/event';

export function Events() {
  const [inputValue, setInputValue] = useState('');
  const [events, setEvents] = useState<Event[]>([]);

  const onClick = () => {
    setInputValue('');
    axios.post(url, { name: inputValue }).then(() => {
      onGetData();
    });
  };

  const onGetData = () => {
    axios.get<Event[]>(url).then((res) => {
      setEvents(res.data);
    });
  };

  useEffect(() => {
    onGetData();
  }, []);
  return (
    <div>
      <div>
        <button
          className='border-2 border-black mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
          onClick={onClick}
        >
          {' '}
          Click me!{' '}
        </button>
        <input
          className='mt-10 border-2 border-black rounded-lg p-2'
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className='absolute left-2/3 rounded-lg bg-gray-300 w-1/4 h-3/4 justify-center text-center mx-16 mb-16 p-2'>
        <h1 className='bg-gray-600 rounded-lg text-4xl font-bold py-4'>Upcoming Events</h1>
        <div className='overflow-auto max-h-96 text-lg text-left py-2 px-8 my-2'>
          {events.map((event) => {
            return <EventItem key={event.id} event={event} onSave={onGetData} />;
          })}
        </div>
      </div>
    </div>
  );
}
