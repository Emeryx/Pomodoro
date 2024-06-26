import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GradientSVG from "../utils/GradientSVG";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import beepSound from "../assets/Beep.mp3"

interface TimerState{timerStatus: string, timerType: "Session" | "Break", time: number}
interface TimerProps {
  sessionLength: number; // session length in seconds
  breakLength: number; // break length in seconds
    timerState: TimerState;
    setTimerState: Function;
}

const Timer: React.FC<TimerProps> = ({ sessionLength, breakLength, timerState, setTimerState }) => { // lengths had already been multiplied by 60
  
    const idCSS = "gradient";
    
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
        setTimerState( (prev : TimerState) =>({
            ...prev,
            timerType: prev.timerType==="Session" ? "Break" : "Session",
            time: prev.timerType==="Session"?breakLength:sessionLength
        }))
    }

    const decrementTime = () => {
        setTimerState( (prev : TimerState) => {
            timeFormatter(prev.time - 1);
            return {
                ...prev,
                time: prev.time - 1
            }
        })
    }

    // Time reaches 0
    useEffect(()=>{
        if(timerState.time === -1){
            const audio = document.getElementById("beep") as HTMLAudioElement;
            audio.play();
            changeTimerType();
        }
    },[timerState.time])
    
    // Paused / Running / Type changed
    useEffect(()=>{
        if(timerState.timerStatus === "Paused") return;
        // Otherwise timerStatus = Running...
        const interval = setInterval(decrementTime, 1000);
        return () => clearInterval(interval)
    },[timerState.timerStatus, timerState.timerType])

    // Lengths / Timer type changed
    useEffect(()=>{
        setTimerState({
            timerStatus: "Paused",
			timerType: "Session",
			time: sessionLength
        })
    }, [sessionLength, breakLength])

    // Lengths changed and timer type changed
    useEffect(()=>{
        console.log(`Progressbar Max value: ${timerState.timerType==="Session"?sessionLength:breakLength}\nSession Length: ${sessionLength}\nBreak Length: ${breakLength}\nTimer time: ${timerState.time}`)
    },[timerState])

    return (
        <div id="timer-container">
            <audio id="beep" src={beepSound} className=""></audio>
            <GradientSVG />
            <CircularProgressbar
                className="w-48 h-48"
                value={timerState.timerType === "Session" ? sessionLength - timerState.time : breakLength - timerState.time}
                text={timeFormatter(timerState.time)}
                minValue={0}
                maxValue={timerState.timerType === "Session" ? sessionLength : breakLength}
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

export default Timer;
