import React, { useState } from 'react';
import './App.sass';
import './index.css'

import BreakConfig from './components/BreakConfig';
import SessionConfig from './components/SessionConfig';
import Timer from './components/Timer';
import Control from './components/Control';

function App() {

  const [breakLength, setBreakLength] = useState(5);

  const [sessionLength, setSessionLength] = useState(25)

  return (
    <div className="App flex flex-col gap-6 justify-center pb-40 md:mx-32 mx-8">
      <Timer />
      <Control />
      <div id='configuration-container' className='flex flex-row gap-x-12 gap-y-6 justify-center flex-wrap'>
        <BreakConfig length={breakLength} />
        <SessionConfig length={sessionLength} />
      </div>
    </div>
  );
}

export default App;

