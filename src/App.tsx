import React, { useState } from "react";
import "./App.sass";
import "./index.css";

import BreakConfig from "./components/BreakConfig";
import SessionConfig from "./components/SessionConfig";
import TimerTwo from "./components/Timer";
import Control from "./components/Control";

// TODO: Handle playing the audio file in ./assets/Beep.mp3
// TODO: OPTIONALLY make the control and config buttons not work if the timer is active

function App() {

    // State hooks

    const [breakLength, setBreakLength] = useState(5); // in minutes

    const [sessionLength, setSessionLength] = useState(25); // in minutes

    const [session, toggleSession] = useState(true); // true at first because a session will have to begin

    const [pausedType, setPausedType] = useState< "pause" | "reset" | "run" | null >(null);

    // Modifying functions for the config container

    const modifyBreak = (increment: boolean) => {
        if(pausedType==="run") return; // Don't do anything if active, toggleActive(false) may be needed in the future
        if (increment && (breakLength + 1 ) <= 60) return setBreakLength(breakLength + 1);
        else if(!increment && (breakLength - 1) > 0) return setBreakLength(breakLength - 1);
    };

    const modifySession = (increment: boolean) => {
        if(pausedType==="run") return; // Don't do anything if active, toggleActive(false) may be needed in the future
        if (increment && (sessionLength + 1 ) <= 60) return setSessionLength(sessionLength + 1);
        else if(!increment && (sessionLength - 1) > 0) return setSessionLength(sessionLength - 1);
    }

    const changeSession = () => {
        console.log("Toggling session...");
        toggleSession(!session);
    } 

    // Reset function

    const reset = () => {
        setBreakLength(5);
        setSessionLength(25);
        setPausedType("reset");
    }

    // Pause function

    const pause = () => { // Pause function
        if(pausedType==="run"){
            setPausedType("pause");
        }
        else{
            setPausedType("run");
        }
    }

    return (
        <div className="App flex flex-col gap-6 justify-center pb-40 md:mx-32 mx-8">
        <TimerTwo sessionLength={sessionLength*60} breakLength={breakLength*60} session={session} toggleSession={changeSession} pausedType={pausedType} />
        <Control resetFunc={reset} startStopFunc={pause} />
        <div
            id="configuration-container"
            className="flex flex-row gap-x-12 gap-y-6 justify-center flex-wrap"
        >
            <BreakConfig length={breakLength} modify={modifyBreak} />
            <SessionConfig length={sessionLength} modify={modifySession} />
        </div>
        </div>
    );
}

export default App;
