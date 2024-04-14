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

interface TimerProps {
  sessionLength: number; // session length in seconds
  breakLength: number; // break length in seconds
  session: boolean; // true - a session is in place, false - a break is in place
  toggleSession: Function;
  pausedType: string | null; // paused type: "reset" or "pause"
}

const TimerTwo: React.FC<TimerProps> = ({ sessionLength, breakLength, session, toggleSession, pausedType }) => { // lengths had already been multiplied by 60
  
    const idCSS = "gradient";

    // const [timerValue, setTimerValue] = useState(0);

    const pausedTimerValue = useRef(0);

    const [timerDisplay, setTimerDisplay] = useState(0);

    const timeFormatter = (length: number) => {
        const min: string = ( length / 60 ) < 10 ? `0${Math.floor(length/60)}` : `${Math.floor(length/60)}` ;
        const sec : string = ( length % 60 ) < 10 ? `0${length%60}` : `${length%60}` ;
        const text = document.querySelector(".CircularProgressbar-text") as HTMLElement;
        if(text) text.innerText = `${min}:${sec}`;
        return `${min}:${sec}`;
    };

    const [formattedTime, setFormattedTime] = useState(timeFormatter(session?sessionLength:breakLength));

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Component loaded - Set Circular progressbar text ID to "time-left"
    useLayoutEffect(() => {
        console.log("inner html set");
        const text = document.querySelector(".CircularProgressbar-text") as HTMLElement;
        console.log(text);
        if (!text) return;
        text.setAttribute("id", "time-left");
    },[]);

    const runTimer = () => {
        console.log(`Session / Break ended and timer is active!\nStarting ${session ? "session" : "break"}\n--------------------------`);
        // Clear any existing interval before starting a new one
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    
        // Start a new interval
        intervalRef.current = setInterval(() => {
    
            // When time reaches session/break length
            if ((pausedTimerValue.current === sessionLength && session) || (pausedTimerValue.current === breakLength && !session) || pausedType!=="run") {
                clearInterval(intervalRef.current!);
                pausedTimerValue.current = 0;
                toggleSession();
                return;
            }

            // Increment timerValue every second
            pausedTimerValue.current++;
            setTimerDisplay(pausedTimerValue.current);
            setFormattedTime(session ? timeFormatter(sessionLength - pausedTimerValue.current) : timeFormatter(breakLength - pausedTimerValue.current));
            console.log("TIMER: " + pausedTimerValue.current);
    
        }, 1000);
    }

    // "Active" or "Session" is changed or component is loaded
    /*useEffect(()=> {
        console.log("Active status: "+active)
        runTimer();
    },[active, session])*/

    // Timer activate / reactivate / pause
    useEffect(()=> {
        if(pausedType==="run"){
            runTimer();
            return;
        }
        if(pausedType==="pause"){
            console.log("Timer paused.");
        }
        else if(pausedType==="reset"){
            pausedTimerValue.current = 0;
            setFormattedTime(session ? timeFormatter(sessionLength) : timeFormatter(breakLength));
            setTimerDisplay(0);
            console.log("Timer reset.");
        }
        clearInterval(intervalRef.current!);
    },[pausedType, session])

    // Session change
    useEffect(()=>{
        pausedTimerValue.current = 0;
        setFormattedTime(session ? timeFormatter(sessionLength) : timeFormatter(breakLength));
        setTimerDisplay(0);
    },[session])

    // Lengths changed
    useEffect(()=>{
        setFormattedTime(timeFormatter(session?sessionLength:breakLength));
    }, [sessionLength, breakLength])

    return (
        <div id="timer-container">
            <audio id="beep" src="../assets/Beep.mp3" className=""></audio>
            <GradientSVG />
            <CircularProgressbar
                className="w-48 h-48"
                value={timerDisplay}
                text={formattedTime}
                minValue={0}
                maxValue={session?sessionLength:breakLength}
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
            {session?'Session':'Break'}
            </h1>
        </div>
    );
};

export default TimerTwo;
