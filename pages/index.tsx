import React, { ChangeEvent, useState } from "react";

import { useInterval } from "usehooks-ts";

import { TimeDuration } from "../components/timer";

import {
  CountdownCircleTimer,
  useCountdown,
} from "react-countdown-circle-timer";

export default function Home() {
  let duration = 30;
  const [count, setCount] = useState<number>(duration);
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useInterval(
    () => {
      if (count === 0) {
        setPlaying(false);
      }
      if (isPlaying) {
        setCount(count - 1);
      }
    },
    isPlaying ? 1000 : null // Every second
  );

  function parseTime(time: number) {
    let minutes: any = Math.floor(time / 60);
    let seconds: any = time - minutes * 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return minutes + ":" + seconds;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#16181A]">
      <div className="fixed w-[500px] h-[500px] text-white">
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={duration}
          size={500}
          strokeWidth={20}
          trailStrokeWidth={11}
          colors={["#FFA500", "#FFA500", "#FFA500", "#A30000"]}
          trailColor="#2b2f33"
          colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime }) => (
            <h1 className="text-4xl font-mono">{parseTime(remainingTime)}</h1>
          )}
        </CountdownCircleTimer>
      </div>

      <div className="text-white text-center">
        <h1 className="font-mono text-4xl fixed left-1/2 translate-x-[-50%]">
          {}
        </h1>
        <button
          onClick={() => setPlaying(!isPlaying)}
          className="relative bottom-[-70px]"
        >
          {isPlaying ? "pause" : "play"}
        </button>
      </div>
    </div>
  );
}
