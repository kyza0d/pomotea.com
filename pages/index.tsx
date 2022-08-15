import React, { ChangeEvent, useState } from "react";

import { useInterval } from "usehooks-ts";

import { TimeDuration } from "../components/timer";

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useInterval(
    () => {
      setCount(count + 1);
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
      <TimeDuration />
      {/* <TimeElapsed ref={input} /> */}

      <svg
        width="613"
        height="613"
        viewBox="0 0 213 213"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible rotate-[-90deg] fixed pointer-events-none"
      >
        <path
          d="M213 106.5C213 165.318 165.318 213 106.5 213C47.6817 213 0 165.318 0 106.5C0 47.6817 47.6817 0 106.5 0C165.318 0 213 47.6817 213 106.5Z"
          stroke="#FFC107"
          style={{ shapeRendering: "revert-layer" }}
          strokeWidth="10"
          // strokeLinecap="round"
          id="time-elapsed"
        />
      </svg>

      {/* <div ref={input}>hello</div> */}
      <div className="text-white text-center">
        <h1 className="font-mono text-4xl fixed left-1/2 translate-x-[-50%]">
          {parseTime(count)}
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
