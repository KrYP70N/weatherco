import React, { useState, useEffect } from 'react';

// Define the props interface
interface ClockProps {
  timeString?: string; // timeString is optional
}

// Function to parse the time string into a Date object
const parseTimeString = (timeStr: string) => {
  const [datePart, timePart] = timeStr.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes);
};

export const Clock: React.FC<ClockProps> = ({ timeString }) => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      if (timeString) {
        setTime(parseTimeString(timeString));
      } else {
        setTime(new Date());
      }
    };

    // Initial time update
    updateTime();

    // Update the time every second
    const intervalId = setInterval(() => {
      if (!timeString) {
        setTime(new Date());
      }
    }, 1000); // Update every 1 second

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeString]); // Depend on timeString

  // Format the time for display
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return <p className='time'>Update: {`${hours}:${minutes}:${seconds}`}</p>
};