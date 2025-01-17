'use client';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Fullcalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Event } from './calendar_components/event-dto';

const url = 'http://localhost:3001/event';

function renderEventContent(eventInfo: any) {
  return (
    <div>
      <i>{eventInfo.event.name}</i>
    </div>
  );
}

function FullCalendar() {
  const [isAdd, setIsAdd] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const onClick = () => {
    setInputValue('');
    axios.post(url, { name: inputValue, startDate: date }).then(() => {
      onGetData();
    });
    setIsAdd(!isAdd);
  };
  const onGetData = () => {
    axios.get<Event[]>(url).then((res) => {
      setEvents(res.data);
    });
  };

  const onAddEvent = () => {
    setIsAdd(!isAdd);
  };

  useEffect(() => {
    onGetData();
  }, []);
  return (
    <div className='max-w-6xl fixed top-20 right-80 left-80 overflow-auto'>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events.map((event) => ({
          title: event.name,
          //date: event.startDate,
        }))}
        eventContent={renderEventContent(events)}
        customButtons={{
          myCustomButton: {
            text: '+',
            click: function () {
              onAddEvent();
            },
          },
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'myCustomButton dayGridMonth,timeGridWeek',
        }}
        height='90vh'
      />
      <div className='fixed top-20 right-0'>
        {isAdd ? (
          <>
            <input
              className='mt-10 border-2 border-black rounded-lg p-2'
              type='date'
              value={date.toISOString()}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
            <input
              className='mt-10 border-2 border-black rounded-lg p-2 max-w-fit'
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className='border-2 border-black mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
              onClick={onClick}
            >
              {' '}
              Add{' '}
            </button>
          </>
        ) : (
          <div />
        )}
      </div>
      ;
    </div>
  );
}

export default FullCalendar;
