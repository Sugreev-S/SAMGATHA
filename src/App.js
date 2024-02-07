import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for styling
import bg_video1 from './question.mp4';
import bg_video2 from './question1.mp4';

const targetDate = new Date(2024, 1, 24);

const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

const StaticCard = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

const FlipUnitContainer = ({ digit, unit }) => {
  const [shuffle, setShuffle] = useState(false);
  const [prevDigit, setPrevDigit] = useState(digit);

  useEffect(() => {
    setShuffle(prevShuffle => !prevShuffle);
    setPrevDigit(digit);
  }, [digit]);

  let currentDigit = digit;
  let previousDigit = prevDigit;

  if (unit === 'days') {
    previousDigit = previousDigit === 0 ? 30 : previousDigit;
  } else if (unit !== 'hours') {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  currentDigit = currentDigit < 10 ? `0${currentDigit}` : currentDigit;
  previousDigit = previousDigit < 10 ? `0${previousDigit}` : previousDigit;

  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;
  const animation1 = shuffle ? 'fold' : 'unfold';
  const animation2 = !shuffle ? 'fold' : 'unfold';

  return (
    <div className={'flipUnitContainer'}>
      <StaticCard position={'upperCard'} digit={currentDigit} />
      <StaticCard position={'lowerCard'} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};

const FlipClock = () => {
  const [time, setTime] = useState({
    days: 0,
    daysShuffle: true,
    hours: 0,
    hoursShuffle: true,
    minutes: 0,
    minutesShuffle: true,
    seconds: 0,
    secondsShuffle: true
  });

  useEffect(() => {
    const timerID = setInterval(() => updateTime(), 1000);

    return () => clearInterval(timerID);
  }, []);

  const updateTime = () => {
    const timeNow = new Date();
    const timeDiff = targetDate - timeNow;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    setTime({
      days,
      hours,
      minutes,
      seconds,
      daysShuffle: true,
      hoursShuffle: true,
      minutesShuffle: true,
      secondsShuffle: true
    });
  };

  const { days, hours, minutes, seconds, daysShuffle, hoursShuffle, minutesShuffle, secondsShuffle } = time;

  return (
    <div className={'flipClock'}>
      <FlipUnitContainer unit={'days'} digit={days} shuffle={daysShuffle} />
      <div className="separator">:</div> {/* colon separator */}
      <FlipUnitContainer unit={'hours'} digit={hours} shuffle={hoursShuffle} />
      <div className="separator">:</div> {/* colon separator */}
      <FlipUnitContainer unit={'minutes'} digit={minutes} shuffle={minutesShuffle} />
      <div className="separator">:</div> {/* colon separator */}
      <FlipUnitContainer unit={'seconds'} digit={seconds} shuffle={secondsShuffle} />
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <video autoPlay loop muted className='bg_video1'>
        <source src={bg_video1} type='video/mp4' />
      </video>


      <video autoPlay loop muted className='bg_video2'>
        <source src={bg_video2} type='video/mp4' />
      </video>
      {/* <Spline scene="https://prod.spline.design/RNc3uR-sGAxxspQ2/scene.splinecode" /> */}
      <div className="flipClockContainer">
        <FlipClock />
      </div>
      <div className="quote">
        PREPARE FOR AN ADVENTURE IN A BOUNDLESS WORLD OF IMAGINATION, FILLED WITH MYSTERY AND EXCITEMENT!
      </div>
    </div>
  );
};


export default App;
