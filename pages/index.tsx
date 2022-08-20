import React, { ChangeEvent, useEffect, useState } from "react";

import { useInterval } from "usehooks-ts";

import { TimeDuration } from "../components/timer";

import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { FaUndoAlt, FaRegSun, FaSlidersH } from "react-icons/fa";
import { FiSettings, FiSliders } from "react-icons/fi";

import moment from "moment";

import {
  CountdownCircleTimer,
  useCountdown,
} from "react-countdown-circle-timer";

export default function Home() {
  let duration: number = 30; // seconds

  let [windowWidth, setWindowWidth] = useState<number>(0);
  let [windowHeight, setWindowHeight] = useState<number>(0);
  let [circleSize, setCircleSize] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerHeight);
    setCircleSize((windowWidth + windowHeight) * 0.5);

    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      setCircleSize(windowHeight * 0.5);
    });
  });

  // Keep state for timer
  const [count, setCount] = useState<number>(duration);

  const [isPlaying, setPlaying] = useState<boolean>(false);

  const [key, setKey] = useState(0);

  useInterval(
    () => {
      if (count <= 0) {
        setPlaying(false); // alert("Time's up!");
      }
      if (isPlaying) {
        setCount(count - 0.01);
      }
    },
    isPlaying ? 10 : null
  );

  return (
    <div className="bg-[#101416] text-[#d6d6d6] grid place-items-center h-screen">
      <div className="grid flex place-items-center gap-10">
        <div>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={duration}
            key={key}
            size={circleSize}
            strokeWidth={windowWidth * 0.025}
            trailStrokeWidth={windowWidth * 0.025}
            colorsTime={[0, 0, 9, 0]}
            colors={["#00ACCE", "#00ACCE", "#00ACCE", "#00ACCE"]}
            trailColor="#202326"
          >
            {() => (
              <h1 className="text-4xl font-mono fixed top-[41vh]">
                {moment().minute(0).second(count).format("mm:ss")}
              </h1>
            )}
          </CountdownCircleTimer>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              setPlaying(false);
              setCount(duration);
              setKey((prevKey) => prevKey + 1);
            }}
          >
            <div className="rounded-full p-4 text-[#aaaaaa]">
              <FaUndoAlt className="text-[3vw]" />
            </div>
          </button>

          <button
            onClick={() => {
              setPlaying(!isPlaying);
              console.log(count);
            }}
          >
            <div className="rounded-full p-6 bg-[#00ACCE] text-white ">
              {isPlaying ? (
                <BsPauseFill className="text-[5vw]" />
              ) : (
                <BsPlayFill className="text-[5vw]" />
              )}
            </div>
          </button>

          <button>
            <div className="rounded-full p-4 border-1 border-[#666666] text-[#aaaaaa]">
              <FiSettings className="text-[3vw]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
