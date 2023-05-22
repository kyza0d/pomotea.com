"use client";

import React, { useState, useEffect } from "react";

import moment from "moment";

import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { FaUndoAlt } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

const sessions = [
  { type: "Working", duration: 10 }, // Array of sessions with their types and durations
  { type: "Break", duration: 5 },
  { type: "Working", duration: 10 },
];

const Home = () => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(sessions[0].duration);
  const [iteration, setIteration] = useState(0);

  const resetTimers = () => {
    sessions.forEach((session, index) => {
      const timerElement = document.querySelectorAll('[role="timer"]')[index];
      const timerDuration = session.duration;

      if (timerElement) {
        const timerDisplay = timerElement.querySelector("h1");
        if (timerDisplay) {
          timerDisplay.innerText = moment()
            .minute(0)
            .second(timerDuration)
            .format("mm:ss");
        }
      }
    });
  };

  useEffect(() => {
    // Update the duration when the iteration changes
    setDuration(sessions[iteration].duration);
  }, [iteration]);

  const handleTimerUpdate = (count: number) => {
    const activeTime = document
      .querySelectorAll('[role="timer"]')
      [iteration].querySelector("h1");

    if (activeTime) {
      // Update the displayed time during the timer countdown
      activeTime.innerText = moment().minute(0).second(count).format("mm:ss");
    }
  };

  const handleTimerComplete = () => {
    setIteration((prevIteration) => {
      const nextIteration = prevIteration + 1;
      // Stop playing if all sessions have completed
      if (nextIteration >= sessions.length) {
        setPlaying(false);
        return prevIteration;
      }
      return nextIteration;
    });

    // Restart the timer with the new duration
    return { shouldRepeat: true, delay: 0, newInitialRemainingTime: duration };
  };

  return (
    <main className={inter.className}>
      <div className="timers">
        {sessions.map((session, index) => (
          <div role="timer" key={index}>
            {/* Display the session duration */}
            <h1>
              {moment().minute(0).second(session.duration).format("mm:ss")}
            </h1>
            <span className="font-semibold">{session.type}</span>{" "}
            {/* Display the session type */}
          </div>
        ))}
      </div>

      <div className="actions">
        <button>
          <FiSettings />
        </button>
        <button
          onClick={() => {
            setIteration(0);
            setPlaying(false);
            resetTimers();
          }}
        >
          <FaUndoAlt />
        </button>
        <button
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          <div>{playing ? <BsPauseFill /> : <BsPlayFill />}</div>{" "}
          {/* Display play or pause icon based on the playing state */}
        </button>

        <div className="circle">
          <CountdownCircleTimer
            strokeWidth={5}
            onUpdate={handleTimerUpdate}
            onComplete={handleTimerComplete}
            size={30}
            colors={["#5be59c", "#e5ae5b", "#e55b5b"]}
            colorsTime={[
              Math.round(duration * 0.6),
              Math.round(duration * 0.4),
              0.0,
            ]}
            trailColor="#1b1e21"
            duration={duration}
            isPlaying={playing}
            key={iteration}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
