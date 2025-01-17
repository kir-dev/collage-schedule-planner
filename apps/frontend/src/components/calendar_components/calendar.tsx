'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { AddEvent } from './add-event';
import DailyView from './daily-view';
import DWView from './daily-weekly-view';
import EventDetails from './event-details';
import { Event } from './event-dto';
import MonthlyView from './monthly-view';

const url = 'http://localhost:3001/event';

enum View {
  Month,
  Week,
  Day,
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isEventDetails, setIsEventDetails] = useState(false);
  const [clickedEvent, setClickedEvent] = useState<Event>();
  const [view, setView] = useState<View>(View.Month);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onGetData = () => {
    axios.get<Event[]>(url).then((res) => {
      setEvents(res.data);
    });
  };

  const onEventClick = (id: number) => {
    setIsEventDetails(!isEventDetails);
    setClickedEvent(events.find((event) => event.id === id));
  };

  useEffect(() => {
    onGetData();
  }, []);

  return (
    <div className='bg-hero-pattern'>
      <div>
        <button
          className='m-1 border-2 border-black bg-blue-900 hover:bg-blue-700 text-gray-400 font-bold py-1 px-2 rounded-lg'
          onClick={() => setView(View.Month)}
        >
          Month
        </button>
        <button
          className='m-1 border-2 border-black bg-blue-900 hover:bg-blue-700 text-gray-400 font-bold py-1 px-2 rounded-lg'
          onClick={() => setView(View.Week)}
        >
          Week
        </button>
        <button
          className='m-1 border-2 border-black bg-blue-900 hover:bg-blue-700 text-gray-400 font-bold py-1 px-2 rounded-lg'
          onClick={() => setView(View.Day)}
        >
          Day
        </button>
      </div>

      <AddEvent
        onGetData={onGetData}
        currentDate={currentDate}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {view === View.Month ? (
        <MonthlyView
          currentDate={currentDate}
          events={events}
          onEventClick={onEventClick}
          setCurrentDate={setCurrentDate}
        />
      ) : (
        ''
      )}
      {view === View.Week ? (
        <DWView events={events} onEventClick={onEventClick} currentDate={currentDate} setCurrentDate={setCurrentDate} />
      ) : (
        ''
      )}
      {view === View.Day ? (
        <DailyView
          currentDate={currentDate}
          events={events}
          onEventClick={onEventClick}
          setCurrentDate={setCurrentDate}
        />
      ) : (
        ''
      )}

      <EventDetails
        isEventDetails={isEventDetails}
        setIsEventDetails={setIsEventDetails}
        clickedEvent={clickedEvent}
        setClickedEvent={setClickedEvent}
        onGetData={onGetData}
      />
    </div>
  );
}
