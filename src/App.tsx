import React, { useState } from "react";
import "./App.sass";
import "./index.css";

import BreakConfig from "./components/BreakConfig";
import SessionConfig from "./components/SessionConfig";
import TimerTwo from "./components/Timer";
import Control from "./components/Control";

// TODO: Handle #time-left and the timer mechanism in general since there is no time state and the play/pause function does nothing. Time should be displayed in MM:SS format
// TODO: My idea is to create one new state which is the numbers of seconds left, I can then parse the minutes left into MM:SS format and send it as a prop to #time-left to use
// TODO: Write the pause function to pause the timer whenever it is clicked and play it again when pressed again
// TODO: Handle what happens when timer reaches zero: Switching between break and session, Play the audio file in ./assets/Beep.mp3, And perform a new count down from the next phase whether it be session or length depending

function App() {

    // State hooks

    const [breakLength, setBreakLength] = useState(2); // in minutes

    const [sessionLength, setSessionLength] = useState(1); // in minutes

    const [active, toggleActive] = useState(false); // false at first because it's idle

    // Modifying functions for the config container

    const modifyBreak = (increment: boolean) => {
        if(active) return; // Don't do anything if active, toggleActive(false) may be needed in the future
        if (increment && (breakLength + 1 ) <= 60) return setBreakLength(breakLength + 1);
        else if(!increment && (breakLength - 1) > 0) return setBreakLength(breakLength - 1);
    };

    const modifySession = (increment: boolean) => {
        if(active) return; // Don't do anything if active, toggleActive(false) may be needed in the future
        if (increment && (sessionLength + 1 ) <= 60) return setSessionLength(sessionLength + 1);
        else if(!increment && (sessionLength - 1) > 0) return setSessionLength(sessionLength - 1);
    }

    // Reset function

    const reset = () => {
        setBreakLength(5);
        setSessionLength(25);
    }

    // Pause function

    const pause = () => {
        toggleActive(prevActive => !prevActive);
        console.log(active);
    }

    return (
        <div className="App flex flex-col gap-6 justify-center pb-40 md:mx-32 mx-8">
        <TimerTwo sessionLength={sessionLength*60} breakLength={breakLength*60} active={active} />
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
