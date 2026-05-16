import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer({ timeLeft, totalTime }) {
    const safeTotal = totalTime || 60;
    const percentage = (timeLeft / safeTotal) * 100;
    const pathColor = percentage <= 25 ? "#ef4444" : percentage <= 50 ? "#f59e0b" : "#6366f1";
  return (
   <div className='step2-timer-ring h-24 w-24'>
        <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "24px",
          pathColor,
          textColor: pathColor,
          trailColor: "#e5e7eb",
          pathTransitionDuration: 0.35,
        })}
        />
      
    </div>
  )
}

export default Timer
