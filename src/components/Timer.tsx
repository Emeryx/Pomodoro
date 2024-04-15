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
    timerDisplay: TimerDisplay;
    setTimerDisplay: Function;
}

const TimerTwo: React.FC<TimerProps> = ({ sessionLength, breakLength, timerDisplay, setTimerDisplay }) => { // lengths had already been multiplied by 60
  
    const idCSS = "gradient";

    // const [timerValue, setTimerValue] = useState(0);

    const pausedTimerValue = useRef(0);

    useEffect(() => {
        // Log timerDisplay whenever it changes
        console.log(timerDisplay);
    }, [timerDisplay]);
    
    const timeFormatter = (length: number) => {
        const min: string = ( length / 60 ) < 10 ? `0${Math.floor(length/60)}` : `${Math.floor(length/60)}` ;
        const sec : string = ( length % 60 ) < 10 ? `0${length%60}` : `${length%60}` ;
        const text = document.querySelector(".CircularProgressbar-text") as HTMLElement;
        if(text) text.innerText = `${min}:${sec}`;
        return `${min}:${sec}`;
    };

    const [formattedTime, setFormattedTime] = useState(timeFormatter(timerDisplay.timerType==="Session"?sessionLength:breakLength));


    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Component loaded - Set Circular progressbar text ID to "time-left"
    useEffect(() => {
        // console.log("inner html set");
        const text = document.querySelector(".CircularProgressbar-text") as HTMLElement;
        // console.log(text);
        if (!text) return;
        text.setAttribute("id", "time-left");
    },[]);


    const changeSession = () => {
        console.log("Switching between session and break or vice versa...");
        setTimerDisplay( (prev : TimerDisplay) =>({
            ...prev,
            timerType: prev.timerType==="Session" ? "Break" : "Session",
            time: 0
        }))
    } 

    const runTimer = () => {
        console.log(`Session / Break ended and timer is active!\nStarting ${timerDisplay.timerType==="Session" ? "session" : "break"}\n--------------------------`);

        // Start a new interval
        intervalRef.current = setInterval(() => {

            // Increment timerValue every second
            pausedTimerValue.current++;
            setTimerDisplay( (prev : TimerDisplay) =>({
                ...prev,
                time: prev.time + 1
            }))
            setFormattedTime(timerDisplay.timerType==="Session" ? timeFormatter(sessionLength - pausedTimerValue.current) : timeFormatter(breakLength - pausedTimerValue.current));
            console.log("TIMER: " + pausedTimerValue.current);
            
        }, 1000);
    }

    // Time reaches max value
    useEffect(()=>{
        if ((timerDisplay.time >= sessionLength && timerDisplay.timerType==="Session") || (timerDisplay.time >= breakLength && timerDisplay.timerType==="Break")) {
            clearInterval(intervalRef.current!);
            setTimeout(()=>{
                changeSession();
                return;
            },1000)
        }
    },[timerDisplay.time])

    // Timer activate / reactivate / pause
    useEffect(()=> {
        console.log("Timer status: "+timerDisplay.timerStatus);
        if(timerDisplay.timerStatus==="Running"){
            runTimer();
            return;
        }
        if(timerDisplay.timerStatus==="Paused"){
            console.log("Timer paused.");
        }
        else if(timerDisplay.timerStatus==="Resetted"){
            setTimerDisplay({
                timerStatus: "Paused",
                timerType: "Session",
                time: 0
            })
            pausedTimerValue.current = 0;
            setFormattedTime(timerDisplay.timerType==="Session" ? timeFormatter(sessionLength) : timeFormatter(breakLength));
            console.log("Timer reset.");
        }
        clearInterval(intervalRef.current!);
    },[timerDisplay.timerStatus, timerDisplay.timerType])

    // Timer type change and timer value set to zero
    useEffect(()=>{
        pausedTimerValue.current = 0;
        setFormattedTime(timerDisplay.timerType==="Session" ? timeFormatter(sessionLength) : timeFormatter(breakLength));
    },[timerDisplay.timerType])

    // Lengths / Timer type changed
    useEffect(()=>{
        setFormattedTime(timeFormatter(timerDisplay.timerType==="Session"?sessionLength:breakLength));
    }, [sessionLength, breakLength, timerDisplay.timerType])

    return (
        <div id="timer-container">
            <audio id="beep" src="../assets/Beep.mp3" className=""></audio>
            <GradientSVG />
            <CircularProgressbar
                className="w-48 h-48"
                value={timerDisplay.time}
                text={formattedTime}
                minValue={0}
                maxValue={timerDisplay.timerType==="Session"?sessionLength:breakLength}
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
            {timerDisplay.timerType==="Session"?'Session':'Break'}
            </h1>
        </div>
    );
};

export default TimerTwo;
