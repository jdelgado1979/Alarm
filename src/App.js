import './App.css';
import React from 'react';
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [secondsPassed, setSecondsPassed] = useState('00');
  const [minutesPassed, setMinutespassed] = useState(10);
  const microsecondintervalRef = useRef(null);
  const secondintervalRef = useRef(null);
  const minuteintervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());
    
    clearInterval(microsecondintervalRef.current);
    microsecondintervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 1);
  }

  function handleStop() {
    clearInterval(microsecondintervalRef.current);
    secondintervalRef.current=0;
  }

  
  let microsecondsPassed = 0;
  if (startTime != null && now != null) {
    microsecondsPassed = (now - startTime)/1000;
   }

   
  if (microsecondsPassed >= 1) {
    handleStart()
    setSecondsPassed('59');
    setSecondsPassed(secondsPassed-1);
    secondintervalRef.current= secondsPassed;
    if (secondsPassed == 0) {
      setSecondsPassed(59);
      secondintervalRef.current= secondsPassed;
      setMinutespassed(minutesPassed-1);
      minuteintervalRef.current=minutesPassed;
    }
  }

  function handleReset() {
    handleStop()
    setSecondsPassed('00');
    // secondintervalRef.current= 0;
    setMinutespassed(25);
    minuteintervalRef.current=minutesPassed;

  }

  


  return (
    <>
    <h2>25 + 5 Clock</h2>
    <h3>Break Length</h3>
    <button onClick={handleUp}>
        Up
      </button>
      <div></div>
      <button onClick={handleDown}>
        Down
      </button>
    <h3>Session Length</h3>
    <button onClick={handleUp}>
        Up
      </button>
      <div></div>
      <button onClick={handleDown}>
        Down
      </button>
      
      <h1>Time passed: {String(minutesPassed).padStart(2, '0')}:{String(secondsPassed).padStart(2, '0')} {microsecondsPassed} </h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
      <button onClick={handleReset}>
        Reset
      </button>
    </>
  );
}