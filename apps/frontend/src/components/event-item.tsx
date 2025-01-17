import axios from 'axios';
import { useState } from 'react';

import { Event } from './calendar_components/event-dto';

const url = 'http://localhost:3001/event';

interface EventItemProps {
  event: Event;
  onSave: () => void;
}

export function EventItem(props: EventItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>(props.event.name);

  const onEdit = () => {
    if (isEditing) {
      axios.patch(`${url}/${props.event.id}`, { name: inputValue }).then(() => props.onSave());
    }
    setIsEditing(!isEditing);
  };

  const onDelete = () => {
    axios.delete(`${url}/${props.event.id}`).then(() => {
      props.onSave();
    });
  };

  return (
    <>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <h3 className='text-base font-medium text-left'>
            {isEditing ? (
              <input
                className='border-2 border-black rounded-lg p-2'
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            ) : (
              <p>{props.event.name}</p>
            )}
          </h3>
          <div className='text-sm text-right text-muted-foreground'>
            {new Date(props.event.startDate).toLocaleString()}
          </div>
        </div>
      </div>
      <button
        className='justify-center border-1 border-black bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg m-2 p-1'
        onClick={onEdit}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button
        className='justify-center border-1 border-black bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg p-1'
        onClick={onDelete}
      >
        {' '}
        Delete{' '}
      </button>
    </>
  );
}
