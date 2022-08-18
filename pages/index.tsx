import React, { ChangeEvent, useState } from "react";

import { useInterval } from "usehooks-ts";

import { TimeDuration } from "../components/timer";

import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { FaUndoAlt, FaRegSun, FaSlidersH } from "react-icons/fa";
import { FiSliders } from "react-icons/fi";

import moment from "moment";

import {
  CountdownCircleTimer,
  useCountdown,
} from "react-countdown-circle-timer";

export default function Home() {
  let duration = 30; // seconds

  // Keep state for timer
  const [count, setCount] = useState<number>(duration);

  const [isPlaying, setPlaying] = useState<boolean>(false);

  const [key, setKey] = useState(0);

  useInterval(
    () => {
      if (count <= 0) {
        setPlaying(false);
        alert("Time's up!");
      }
      if (isPlaying) {
        setCount(count - 0.01);
        let decimals = Math.round(count * 100) / 100;
      }
    },
    isPlaying ? 10 : null
  );

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#141517] text-[#d6d6d6]">
      <div className="fixed w-[500px] h-[500px]">
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={duration}
          key={key}
          size={500}
          strokeWidth={20}
          trailStrokeWidth={10}
          colorsTime={[0, 0, 9, 0]}
          colors={["#cc8400", "#cc8400", "#cc8400", "#cc8400"]}
          trailColor="#202326"
        >
          {() => (
            <h1 className="text-4xl font-mono relative bottom-[-10px]">
              {moment().minute(0).second(count).format("mm:ss")}
            </h1>
          )}
        </CountdownCircleTimer>
      </div>

      <div className="flex items-center gap-4 text-center">
        <div className="flex items-center relative bottom-[-350px] gap-6">
          <button
            onClick={() => {
              setPlaying(false);
              setCount(duration);
              setKey((prevKey) => prevKey + 1);
            }}
          >
            <div className="rounded-full p-4 border border-[#666666] text-[#aaaaaa]">
              <FaUndoAlt size={15} />
            </div>
          </button>

          <button
            onClick={() => {
              setPlaying(!isPlaying);
              console.log(count);
            }}
          >
            <div className="rounded-full p-6 bg-[#cc8400] text-white ">
              {isPlaying ? <BsPauseFill size={25} /> : <BsPlayFill size={25} />}
            </div>
          </button>

          <button>
            <div className="rounded-full p-4 border border-[#666666] text-[#aaaaaa]">
              <FiSliders size={15} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
