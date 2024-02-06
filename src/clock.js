import React, { useState, useEffect } from "react";
import "./FlipClock.css";

const FlipClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  const hours = formatTimeUnit(time.getHours());
  const minutes = formatTimeUnit(time.getMinutes());
  const seconds = formatTimeUnit(time.getSeconds());

  return (
    <div className="flip-clock">
      <div className="flip">
        <div className="flip-unit-wrapper">
          <div className="flip-unit">{hours[0]}</div>
        </div>
        <div className="flip-unit-wrapper">
          <div className="flip-unit">{hours[1]}</div>
        </div>
      </div>
      <div className="flip-separator">:</div>
      <div className="flip">
        <div className="flip-unit-wrapper">
          <div className="flip-unit">{minutes[0]}</div>
        </div>
        <div className="flip-unit-wrapper">
          <div className="flip-unit">{minutes[1]}</div>
        </div>
      </div>
      <div className="flip-separator">:</div>
      <div className="flip">
        <div className="flip-unit-wrapper">
          <div className="flip-unit">{seconds[0]}</div>
        </div>
        <div className="flip-unit-wrapper">
          <div className="flip-unit">{seconds[1]}</div>
        </div>
      </div>
    </div>
  );
};

export default FlipClock;
