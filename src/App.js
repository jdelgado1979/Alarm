import './App.css';
import React from 'react';
import { useState, useRef } from 'react';

export default function alarm() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [session, setSession] = useState('Session');
  const [secondsPassed, setSecondsPassed] = useState('00');
  const [minutesPassed, setMinutespassed] = useState(25);
  const [minutesPassed2, setMinutespassed2] = useState(5);
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
    if(minutesPassed == 0 && secondsPassed == 0){
      
       handleSession();
       setMinutespassed(minutesPassed2);
       setSecondsPassed('00');
       minuteintervalRef.current=minutesPassed2;
       if(session == 'Break' && minutesPassed >= 1) {
        setMinutespassed(minutesPassed2-1);
        minuteintervalRef.current=minutesPassed2;
         
      } if(session == 'Break' && minutesPassed == 0 && secondsPassed == 0) {
        handleReset();
      }
        
      
     } 
    }

  function handleStop() {
    clearInterval(microsecondintervalRef.current);
    secondintervalRef.current=0;
  }

  function handleReset() {
    handleStop()
    setSecondsPassed('00');
    setMinutespassed(25);
    setMinutespassed2(5);
    minuteintervalRef.current=minutesPassed;
    setSession('Session');
  }

  function handleSession() {
    setSession('Break');
   }

  function handleDown1() {
    if (minutesPassed > 1 ){
      setMinutespassed(minutesPassed-1);
    }    
  }

  function handleUp1() {
    if (minutesPassed < 60 ){
      setMinutespassed(minutesPassed+1);
    }
  }

  function handleDown2() {
    if (minutesPassed2 > 1){
      setMinutespassed2(minutesPassed2-1);
    }    
  }

  function handleUp2() {
    if (minutesPassed2 < 60 ){
      setMinutespassed2(minutesPassed2+1);
    }
  }

  
  return (
    <>
    <h2>25 + 5 Clock</h2>

    <h3>Session Length</h3>
      <button onClick={handleUp1}>
        Up
      </button>
      {session == 'Session'?String(minutesPassed).padStart(2, '0'):'00'}
      <button onClick={handleDown1}>
       Down
      </button>

    <h3>Break Length</h3>
      <button onClick={handleUp2}>
        Up
      </button>
      {String(minutesPassed2).padStart(2, '0') }
      <button onClick={handleDown2}>
       Down
      </button>
      
      
  
      <h3>{session} Length</h3>
      <h1> {String(minutesPassed).padStart(2, '0')}:{String(secondsPassed).padStart(2, '0')} {microsecondsPassed} </h1>
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