import axios from 'axios';
import { useState } from 'react';

const url = 'http://localhost:3001/event';

interface AddEventProps {
  onGetData: () => void;
  currentDate: Date;
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

export function AddEvent(props: AddEventProps) {
  const [inputValue, setInputValue] = useState('');
  const [isAdd, setIsAdd] = useState(false);

  const onClick = () => {
    if (inputValue !== '') {
      axios
        .post(url, {
          name: inputValue,
          startDate: props.startDate,
          endDate: props.endDate,
          startTime: props.startDate,
          endTime: props.endDate,
        })
        .then(() => {
          props.onGetData();
        });
    }
    setInputValue('');
    setIsAdd(!isAdd);
  };

  const onAddEvent = () => {
    setIsAdd(!isAdd);
  };

  return (
    <div className='fixed top-8 right-0 m-2'>
      {isAdd ? (
        <div className='flex flex-col bg-white p-2 rounded-lg border-2 border-black'>
          <button
            className='self-end border-2 border-black bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg'
            onClick={onAddEvent}
          >
            X
          </button>
          <p className='self-end'>
            Start Date:
            <input
              className='ml-1 mt-3 border-2 border-black rounded-lg p-2'
              type='datetime-local'
              onChange={(e) => props.setStartDate(new Date(e.target.value))}
            />
          </p>
          <p className='self-end'>
            End Date:
            <input
              className='ml-1 mt-3 border-2 border-black rounded-lg p-2'
              type='datetime-local'
              onChange={(e) => props.setEndDate(new Date(e.target.value))}
            />
          </p>
          <p className='self-end'>
            Name:
            <input
              className='ml-1 mt-3 border-2 border-black rounded-lg p-2 max-w-fit'
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </p>
          <button
            className='mt-3 border-2 border-black bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg'
            onClick={onClick}
          >
            {' '}
            Add{' '}
          </button>
        </div>
      ) : (
        <button
          className='border-2 border-black mt-10 bg-gray-500 hover:bg-gray-700 font-bold py-2 px-4 rounded-lg'
          onClick={onAddEvent}
        >
          {' '}
          +{' '}
        </button>
      )}
    </div>
  );
}
