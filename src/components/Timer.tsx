import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GradientSVG from "../utils/GradientSVG";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

const Timer = () => {
  return (
    <div id="timer-container">
      <h3 id="time-left" className="text-4xl text-white">
        25:00
      </h3>
    </div>
  );
};

interface TimerDisplay{timerStatus: string, timerType: string, time: number}
interface TimerProps {
  sessionLength: number; // session length in seconds
  breakLength: number; // break length in seconds
    timerState: TimerDisplay;
    setTimerState: Function;
}

const TimerTwo: React.FC<TimerProps> = ({ sessionLength, breakLength, timerState, setTimerState }) => { // lengths had already been multiplied by 60
  
    const idCSS = "gradient";

    // const [timerValue, setTimerValue] = useState(0);
    
    useEffect(()=>{
        console.log(timerState);
    },[timerState])

    const timeFormatter = (length: number) => {
        const min: string = ( length / 60 ) < 10 ? `0${Math.floor(length/60)}` : `${Math.floor(length/60)}` ;
        const sec : string = ( length % 60 ) < 10 ? `0${length%60}` : `${length%60}` ;
        const text = document.querySelector(".CircularProgressbar-text") as HTMLElement;
        if(text) text.innerText = `${min}:${sec}`;
        return `${min}:${sec}`;
    };

    // Component loaded - Set Circular progressbar text ID to "time-left"
    useEffect(() => {
        // console.log("inner html set");
        const text = document.querySelector(".CircularProgressbar-text") as HTMLElement;
        // console.log(text);
        if (!text) return;
        text.setAttribute("id", "time-left");
    },[]);

    const changeTimerType = () => {
        console.log("Switching between session and break or vice versa...");
        setTimerState( (prev : TimerDisplay) =>({
            ...prev,
            timerType: prev.timerType==="Session" ? "Break" : "Session",
            time: 0
        }))
    }

    // Lengths / Timer type changed
    useEffect(()=>{
        setTimerState({
            timerStatus: "Paused",
			timerType: "Session",
			time: sessionLength
        })
    }, [sessionLength, breakLength, timerState.timerType])

    return (
        <div id="timer-container">
            <audio id="beep" src="../assets/Beep.mp3" className=""></audio>
            <GradientSVG />
            <CircularProgressbar
                className="w-48 h-48"
                value={timerState.timerType === "Session?" ? sessionLength - timerState.time : breakLength - timerState.time}
                text={timeFormatter(timerState.time)}
                minValue={0}
                maxValue={timerState.timerType==="Session"?sessionLength:breakLength}
                strokeWidth={6}
                // counterClockwise={true}
                styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 1,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",

                // Text size
                textSize: "24px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.25,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: `url(#${idCSS})`,
                textColor: "#fafafa",
                trailColor: "#fafafa",
                backgroundColor: "#3e98c7",
                })}
            />
            <h1 id="timer-label" className="text-2xl text-white">
            {timerState.timerType==="Session"?'Session':'Break'}
            </h1>
        </div>
    );
};

export default TimerTwo;
