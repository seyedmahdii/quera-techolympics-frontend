import { useState, useEffect, useRef } from "react";

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [logs, setLogs] = useState([]);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
      }, 10);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      setIsRunning(!isRunning);
    }
  }, []);

  function toggleTimer() {
    setIsRunning((prevIsRunning) => !prevIsRunning);
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
    } else {
      startTimeRef.current = Date.now();
    }
  }

  function reset() {
    setIsRunning(false);
    setElapsedTime(0);
    clearInterval(intervalIdRef.current);
    startTimeRef.current = 0;
  }

  function logTime() {
    const log = {
      time: formatTime(),
    };
    setLogs((prevLogs) => [...prevLogs, log]);
  }

  function deleteLogs() {
    setLogs([]);
  }

  function formatTime() {
    let minutes = Math.floor(elapsedTime / 60000);

    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = (elapsedTime % 1000) / 10;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  }

  return (
    <div>
      <h1 data-testid="Timer">{formatTime()}</h1>
      <button data-testid="toggle-button" onClick={toggleTimer}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button data-testid="reset-button" onClick={reset}>
        Reset
      </button>
      <button data-testid="log-button" onClick={logTime}>
        Log Time
      </button>
      <h3>Logged Times:</h3>

      {logs.length > 0 && (
        <>
          <button
            data-testid="delete-logs"
            className="delete"
            onClick={deleteLogs}
          >
            delete logs
          </button>
          <ul>
            {logs.map((log) => (
              <li key={log.date}>{log.time}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Timer;
