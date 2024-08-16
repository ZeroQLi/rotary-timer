/* CAUTION: absolute catastrophe ahead, read at your own risk */

import { useState, useEffect } from 'react'
import './App.css'
import RotaryDial from './RotaryDial'
import Countdown, { zeroPad } from 'react-countdown';
import Confetti from 'react-confetti-boom';
var audio = new Audio('/horn.mp3');

let current = 0;

function App() {

  const [hourTens, setHourTens] = useState(0);
  const [hourOnes, setHourOnes] = useState(0);

  const [minuteTens, setMinuteTens] = useState(0);
  const [minuteOnes, setMinuteOnes] = useState(0);

  const [secondTens, setSecondTens] = useState(0);
  const [secondOnes, setSecondOnes] = useState(0);


  const [timeIndex, setTimeIndex] = useState(0);
  const [timerstamp, setTimerstamp] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  let timer = false;

  const updateTimer = (number) => {
    console.log(current);
    
    switch (current) {
      case 0:
        setHourTens(number);
        break;
      case 1:
        setHourOnes(number);
        break
      case 2:
        setMinuteTens(number);
        break;
      case 3:
        setMinuteOnes(number);
        break;
      case 4:
        setSecondTens(number);
        break;
      case 5:
        setSecondOnes(number);
        break;
    }

    setTimeIndex((prevIndex) => (prevIndex + 1) % 6)
    current = (current + 1) % 6;
    }

    useEffect(() => {
      const rd = new RotaryDial({ 
        discFillColor: '#d6ccc2',
        discStrokeColor: '#d5bdaf',
        circlesStrokeColor: '#fffcf2',
        circlesHighlightColor: '#3a6ea5',
        arrowFillColor: '#d00000',
        callback: updateTimer
       });}, 
    []);

  const activateTimer = () => {
      setTimerstamp((timestamp) => timestamp = (((hourTens * 10 + hourOnes) * 60 * 60) + ((minuteTens * 10 + minuteOnes) * 60) + (secondTens * 10) + secondOnes) * 1000 )

      setTimerActive ((check) => check = true )
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        audio.play();
        return <>
          <h1 className='countDown' >{zeroPad(hours)} : {zeroPad(minutes)} : {zeroPad(seconds)}</h1>
          <Confetti mode="boom" particleCount={100} />
        </>
      }
      else {
        return <>
          <h1 className='countDown' >{zeroPad(hours)} : {zeroPad(minutes)} : {zeroPad(seconds)}</h1>
        </>
      }
  };
  
  const disableTimer = () => {
    setTimerActive((check) => check = false)

    setHourTens(0);
    setHourOnes(0);
    setMinuteTens(0);
    setMinuteOnes(0);
    setSecondTens(0);
    setSecondOnes(0);

    setTimeIndex((prevIndex) => prevIndex = 0)
    current = 0;
  }

  return (
    <div id='timer'>
      { timerActive ? 
        <Countdown date={Date.now() + timerstamp} renderer={renderer} />
      : 
        <h1>
          <span className={timeIndex === 0 ? "active" : ''}>{hourTens}</span>
          <span className={timeIndex === 1 ? "active" : ''}>{hourOnes}</span> :
          <span> </span>
          <span className={timeIndex === 2 ? "active" : ''}>{minuteTens}</span>
          <span className={timeIndex === 3 ? "active" : ''}>{minuteOnes}</span> :
          <span> </span>
          <span className={timeIndex === 4 ? "active" : ''}>{secondTens}</span>
          <span className={timeIndex === 5 ? "active" : ''}>{secondOnes}</span>
        </h1>
      }

      <button onClick={timerActive ? disableTimer : activateTimer}> {timerActive ? 'Reset' : 'Start'} </button>
      {/* {timerActive ? <h3>Dial "9" to pause. "5" to play. "8" to reset</h3> : <h3></h3>  } */}
      <h3></h3>
    </div>
  )
}

export default App
