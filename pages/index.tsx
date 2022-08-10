import anime from "animejs";
import { useEffect } from "react";

const TimeElapsed = function () {
  return (
    <svg
      width="213"
      height="213"
      viewBox="0 0 213 213"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible rotate-[-90deg]"
    >
      <path
        d="M213 106.5C213 165.318 165.318 213 106.5 213C47.6817 213 0 165.318 0 106.5C0 47.6817 47.6817 0 106.5 0C165.318 0 213 47.6817 213 106.5Z"
        stroke="#FFC107"
        style={{ shapeRendering: "revert-layer" }}
        strokeWidth="10"
        id="time-elapsed"
      />
    </svg>
  );
};

const TimeDuration = function () {
  return (
    <svg
      width="213"
      height="213"
      viewBox="0 0 213 213"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible rotate-[-90deg] fixed"
    >
      <path
        d="M213 106.5C213 165.318 165.318 213 106.5 213C47.6817 213 0 165.318 0 106.5C0 47.6817 47.6817 0 106.5 0C165.318 0 213 47.6817 213 106.5Z"
        stroke="#000000"
        strokeWidth="10"
        id="time-duration"
      />
    </svg>
  );
};

export default function Home() {
  useEffect(() => {
    let start = anime({
      targets: "#time-elapsed",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 4000,
      direction: "forward",
      easing: "linear",
      loop: true,
    });
    start.play();
  });
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#1D1F21]">
      <TimeDuration />
      <TimeElapsed />
    </div>
  );
}
