import './App.css';
// import img from './images/alarmImage.png';
import  downbutton from'./images/downButton.png';
import  upbutton from './images/Upbutton.png';
import  playbutton from './images/playButton.png';
import  resetbutton from './images/resetButton.png';
import  pausebutton from './images/pauseButton.png';
import React from 'react';
import { useState, useRef, useEffect } from 'react';

export default function alarm() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [session, setSession] = useState('Session');
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [minutesPassed, setMinutesPassed] = useState(25);
  const [minutesPassed2, setMinutespassed2] = useState(5);
  const [color, setColor] = useState('white');
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
              
              handleColor('white');
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
    setColor('white');
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
    <div className='one' >

    <h2 className= "title">25 + 5 Clock</h2>    
    
    <div  className= "package" >    

     <div className='a' style={{color}}>
     <button>
      <img className= "btUp" onClick={handleUp1} src={upbutton}  alt="an arrow up" />
      </button>
     <h3 className= "session">Session Length</h3>
     <button >
      <img className= "btDown" onClick={handleDown1} src={downbutton}  alt="an arrow down" />
      </button>
      <div className='a1' style={{color}}>
      {session == 'Session'? String(minutesPassed).padStart(2, '0'):'00'}
      </div>
    </div>

     <div className='b'>
      <div className='b1'>
       <h3 className= "sessionTitle" style={{color}}>{session} </h3>
       <h1 className= "display" style={{color}}> {String(minutesPassed).padStart(2, '0')}:{String(secondsPassed).padStart(2, '0')} </h1>
       </div>
      <div className='b2'>
       <button>
       <img className= "btStart" onClick={handleStart} src={playbutton}  alt="a play button" />
       </button>
       <button >
       <img className= "btStop" onClick={handleStop} src={pausebutton}  alt="a button to stop the timer" />
       </button>
       <button >
       <img className= "btReset" onClick={handleReset} src={resetbutton}  alt="a button to reset the timer" />
       </button>
      </div>
     </div>

     <div className='c' style={{color}}>

     <button>
      <img className= "btUp" onClick={handleUp2} src={upbutton}  alt="an arrow up" />
      </button>
      <h3 className= "breakT">Break Length</h3>      
      
      <button>
      <img className= "btDown" onClick={handleDown2} src={downbutton}  alt="an arrow down" />
      </button>
      <div className='c1' style={{color}}>
      {String(minutesPassed2).padStart(2, '0') }
      </div>
     </div>  
  
    </div>

    <a className='d' href="https://www.vecteezy.com/free-png/up-button">All button PNGs by Vecteezy</a>

   </div>
    </>
  );
}

