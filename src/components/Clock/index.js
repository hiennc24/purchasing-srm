import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [timeNow, setTimeNow] = useState(new Date());

  useEffect(() => {
    const timeId = setInterval(() => {
      setTimeNow(new Date());
    }, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, []);

  return <span>{timeNow.toLocaleTimeString()}</span>;
}

export default Clock;
