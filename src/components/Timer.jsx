import React, { useState, useEffect } from 'react';

const Timer = ({ initialSeconds, onTimerEnd }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      onTimerEnd();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, onTimerEnd]);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return <span className="text-sm text-gray-500">{formatTime(seconds)}</span>;
};

export default Timer;
