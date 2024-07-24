import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [showLaps, setShowLaps] = useState(false);
  const intervalId = useRef(null);

  const startStopwatch = () => {
    if (!running) {
      intervalId.current = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
      }, 10);
      setRunning(true);
    }
  };

  const stopStopwatch = () => {
    clearInterval(intervalId.current);
    setRunning(false);
  };

  const stopAndReset = () => {
    clearInterval(intervalId.current);
    setTime(0);
    setRunning(false);
    setLaps([]);
  };

  const recordLap = () => {
    const newLap = time.toFixed(2);
    setLaps([...laps, newLap]);
  };

  const toggleLaps = () => {
    setShowLaps(!showLaps);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
        <div className="text-5xl font-extrabold text-gray-800 mb-8">{time.toFixed(2)}</div>
        <div className="flex flex-col gap-4 mb-8">
          {!running ? (
            <button
              className="button-start"
              onClick={startStopwatch}
            >
              Start
            </button>
          ) : (
            <button
              className="button-stop"
              onClick={stopStopwatch}
            >
              Stop
            </button>
          )}
          <div className="flex gap-4">
            <button
              className="button-reset"
              onClick={stopAndReset}
            >
              Reset
            </button>
            <button
              className="button-lap"
              onClick={recordLap}
            >
              Lap
            </button>
            <button
              className="button-laps"
              onClick={toggleLaps}
            >
              {showLaps ? 'Hide Laps' : 'Show Laps'}
            </button>
          </div>
        </div>
        {showLaps && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Laps</h2>
            <ul className="list-disc pl-5 space-y-2">
              {laps.map((lap, index) => (
                <li key={index} className="lap-item">
                  Lap {index + 1}: {lap} sec
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
