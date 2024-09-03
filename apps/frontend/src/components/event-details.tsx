import axios from 'axios';
import { useState } from 'react';

import { Event } from './event-dto';

const url = 'http://localhost:3001/event';

interface EventDetailsProps {
  isEventDetails: boolean;
  setIsEventDetails: (value: boolean) => void;
  clickedEvent: Event;
  setClickedEvent: (event: Event) => void;
  onGetData: () => void;
}

export default function EventDetails(props: EventDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(props.clickedEvent?.name);

  const onDelete = () => {
    axios.delete(`${url}/${props.clickedEvent?.id}`).then(() => {
      props.onGetData();
      props.setIsEventDetails(!props.isEventDetails);
    });
  };

  const onEdit = () => {
    if (editValue !== '') {
      if (isEditing) {
        axios.patch(`${url}/${props.clickedEvent?.id}`, { name: editValue }).then(() => {
          props.onGetData();
          onGetName(props.clickedEvent?.id);
        });
      }
    }
    setEditValue(props.clickedEvent?.name);
    setIsEditing(!isEditing);
  };

  const onGetName = (id: number) => {
    axios.get(`${url}/${id}`).then((res) => {
      props.setClickedEvent(res.data);
    });
  };

  return (
    <div>
      {props.isEventDetails ? (
        <div className='flex flex-col fixed top-32 right-0 bg-white rounded-lg border-2 border-black p-6 w-full max-w-sm overflow-auto mr-5'>
          <div className='flex flex-col items-center justify-between mb-4'>
            <button
              className='self-end border-2 border-black bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg'
              onClick={() => {
                props.setIsEventDetails(!props.isEventDetails);
                setIsEditing(false);
              }}
            >
              X
            </button>
            <h2 className='text-lg font-semibold self-start'>Event details</h2>
          </div>
          <div className='grid gap-4 self-start'>
            <p className=''>
              Name:{' '}
              {isEditing ? (
                <input
                  className='self-start mt-10 border-2 border-black rounded-lg p-2 max-w-fit'
                  type='text'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span>{props.clickedEvent?.name}</span>
              )}
            </p>
            <p>Description: {props.clickedEvent?.description}</p>
            <p>Location: {props.clickedEvent?.location}</p>
            <p>Start date: {new Date(props.clickedEvent.startDate).toDateString()}</p>
            <p>End date: {new Date(props.clickedEvent.endDate).toDateString()}</p>
            <p>Start time: {new Date(props.clickedEvent.startTime).toLocaleTimeString()}</p>
            <p>End time: {new Date(props.clickedEvent.endTime).toLocaleTimeString()}</p>
            <p>Priority: {props.clickedEvent?.priority}</p>
            <p>Status: {props.clickedEvent?.status}</p>
          </div>
          <button
            className='self-end border-2 border-black bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg'
            onClick={() => onDelete()}
          >
            Delete
          </button>
          <button
            className='mt-2 self-end border-2 border-black bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-lg'
            onClick={onEdit}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
