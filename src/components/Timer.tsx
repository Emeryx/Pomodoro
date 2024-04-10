import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GradientSVG from "../utils/GradientSVG";
import { useEffect, useState, useRef } from "react";

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
  active: boolean; // true - timer is active, false - timer is idle
}

const TimerTwo: React.FC<TimerProps> = ({ sessionLength, breakLength, session, active }) => { // lengths had already been multiplied by 60
  
    const idCSS = "gradient";

    // const [timerValue, setTimerValue] = useState(0);

    const timerValue = useRef(0);

    const [timerDisplay, setTimerDisplay] = useState(0);

    const timeFormatter = (length: number) => {
        const min: string = ( length / 60 ) < 10 ? `0${Math.floor(length/60)}` : `${Math.floor(length/60)}` ;
        const sec : string = ( length % 60 ) < 10 ? `0${length%60}` : `${length%60}` ;
        return `${min}:${sec}`;
    };

    const [formattedTime, setFormattedTime] = useState(timeFormatter(session?sessionLength:breakLength));

    // Component loaded & active changed - Set Circular progressbar text ID to "time-left"
    useEffect(() => {
        console.log("inner html set");
        const text = document.querySelector(".CircularProgressbar-text");
        console.log(text);
        if (!text) return;
        text.setAttribute("id", "time-left");
    }, [active]);

    // "Active" is changed
    useEffect(()=> {
        if(!active) return; // If the timer is idle do nothing, Otherwise...
        const interval = setInterval(()=>{ // Increment timerValue every 1000ms (1 second)
            if(( ( timerValue.current < sessionLength && session ) || (timerValue.current < breakLength && !session ) && active )){
                timerValue.current++;
                setTimerDisplay(timerValue.current);
                setFormattedTime(session?timeFormatter(sessionLength-timerValue.current):timeFormatter(breakLength-timerValue.current));
                console.log("TIMER: "+timerValue.current);
            }
            else{
                clearInterval(interval);
            }
        },1000); 
        return () => {
            const audioEl = document.getElementById("beep") as HTMLAudioElement;
            audioEl?.play();
            clearInterval(interval);
        }
    },[active])

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
                pathTransitionDuration: 1,

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
