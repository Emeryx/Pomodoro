import React, { useState } from 'react';
import './App.css';
import './index.css'

import BreakConfig from './components/BreakConfig';
import SessionConfig from './components/SessionConfig';
import Timer from './components/Timer';
import Control from './components/Control';

function App() {

  const [breakLength, setBreakLength] = useState(5);

  const [sessionLength, setSessionLength] = useState(25)

  return (
    <div className="App">
      <div id='configuration-container'>
        <BreakConfig length={breakLength} />
        <SessionConfig length={sessionLength} />
      </div>
      <Timer />
      <Control />
    </div>
  );
}

export default App;

