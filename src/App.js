import './App.css';
import React from 'react';
import { useState, useRef, useEffect } from 'react';

export default function alarm() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [session, setSession] = useState('Session');
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [minutesPassed, setMinutesPassed] = useState(25);
  const [minutesPassed2, setMinutespassed2] = useState(5);
  const [color, setColor] = useState('black');
  const microsecondintervalRef = useRef(null);
  const secondintervalRef = useRef(null);
  const minuteintervalRef = useRef(null);
  

  var result = 'http://www.simphonics.com/library/WaveFiles/Production%20Wavefiles/FS-98/pjstall.wav';
  let obj = new Audio(result);

  function handlePlay() {
    obj.play();
  }

  function handleColor(color) {
    setColor(color);
  }
  

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());
    
    clearInterval(microsecondintervalRef.current);
    microsecondintervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100);
  }


    let microsecondsPassed = 0;
    
    if (startTime != null && now != null) {
      microsecondsPassed = Math.floor((now - startTime) / 1000);
    }
    
    useEffect(() => {
    if ( minutesPassed === 0) {
      setMinutesPassed((prevMinutes) => {
        if (prevMinutes === 0) {
          handleColor('red');
        }
        return prevMinutes;
      });
      
     }
   },  [minutesPassed, color]);

    
    if (microsecondsPassed >= 1) {
       handleStart();
  
       setSecondsPassed((prevSeconds) => {

        if (prevSeconds === 0) {

          setMinutesPassed((prevMinutes) => {
            
            if (prevMinutes === 0) {
              
              handleColor('black');
              handlePlay();
              handleSession(); 
              setMinutesPassed(minutesPassed2);
              setSecondsPassed(0);
              setTimeout(() => {                
                handleStart();
              }, 3000);
              minuteintervalRef.current=minutesPassed2;

              if(session === 'Break' && prevMinutes === 0) {
                clearInterval(microsecondintervalRef.current);
                setMinutesPassed(0);
                setSecondsPassed(0);
                setTimeout(() => {
                  handleReset();
                 }, 3000);
                
              }
            }

            return prevMinutes-1;
          
          });

          setSecondsPassed(59);
        }  
        
        else {
        
          secondintervalRef.current= secondsPassed;
          return prevSeconds - 1;
         } 
         
      });
      
      } 
 

  function handleStop() {
    clearInterval(microsecondintervalRef.current);
    
  }

  function handleReset() {
    handleStop()
    setSecondsPassed(0);
    setMinutesPassed(25);
    setMinutespassed2(5);
    minuteintervalRef.current=25;
    setSession('Session');
    setColor('black');
  }

 

  function handleSession() {
    setSession('Break');
  }

  function handleDown1() {
    if (minutesPassed > 1 ){
      setMinutesPassed(minutesPassed-1);
    }    
  }

  function handleUp1() {
    if (minutesPassed < 60 ){
      setMinutesPassed(minutesPassed+1);
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
      {session == 'Session'? String(minutesPassed).padStart(2, '0'):'00'}
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
      
      
  
      <h3 style={{color}}>{session} </h3>
      <h1 style={{color}}> {String(minutesPassed).padStart(2, '0')}:{String(secondsPassed).padStart(2, '0')} </h1>
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
