import React from "react";
import moment from "moment";
import { FaUndoAlt } from "react-icons/fa";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card } from "@/components/ui/card";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

import { useSettings } from '@/components/Settings/context';
import useTimer from "@/hooks/useTimer";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { Settings } from "../Settings";
export default function Timer() {
  const sessions = [
    { type: 'Working', duration: 3 },
    { type: 'Break', duration: 2 },
    { type: 'Working', duration: 3 },
  ];

  const { settings } = useSettings();
  const { 'duration-mode': durationMode } = settings;

  const {
    currentSessionIndex,
    elapsedTime,
    isPlaying,
    key,
    completedSessions,
    duration,
    remainingTime,
    togglePlayPause,
    resetTimer,
  } = useTimer(sessions);

  const getTaskDuration = (session: { type: string; duration: number }, index: number) => {
    if (completedSessions.has(index)) {
      return '00:00';
    }

    if (durationMode === 'entireLength') {
      const sessionStart = sessions.slice(0, index).reduce((total, s) => total + s.duration, 0);
      const sessionEnd = sessionStart + session.duration;

      if (elapsedTime >= sessionStart && elapsedTime < sessionEnd) {
        return moment.utc((sessionEnd - elapsedTime) * 1000).format('mm:ss');
      } else if (elapsedTime >= sessionEnd) {
        return '00:00';
      } else {
        return moment.utc(session.duration * 1000).format('mm:ss');
      }
    } else {
      return index === currentSessionIndex
        ? moment.utc(remainingTime * 1000).format('mm:ss')
        : moment.utc(session.duration * 1000).format('mm:ss');
    }
  };

  return (
    <div className="mx-auto pt-8 max-w-screen-md">
      <Card className="space-y-8 w-full bg-transparent dark:bg-transparent mb-6">
        <div className="flex items-center justify-between space-x-6">
          <div className="flex items-center">
            <CountdownCircleTimer
              key={`${durationMode}-${key}`}
              strokeWidth={12}
              size={70}
              colors={["#5be59c", "#e5ae5b", "#e55b5b"]}
              colorsTime={[duration * 0.4, duration * 0.2, 0]}
              trailColor="#1b1e21"
              duration={duration - 1}
              initialRemainingTime={remainingTime - 1}
              isPlaying={isPlaying}
              renderAriaTime={(remainingTime) => moment.utc(remainingTime * 1000).format('mm:ss')}
            />
            <div className="ml-4">
              <Text variant="subtitle" size="md">Current Task:</Text>
              <Text variant="header" size="lg">Work on Pomodoro Timer </Text>
            </div>
          </div>
          <div className="ml-auto">
            <Settings />
            <Button variant="ghost" onClick={resetTimer}>
              <FaUndoAlt className="icon" />
            </Button>
          </div>
        </div>
        {sessions.map((session, index) => (
          <Card key={index} className="px-4 pr-8 py-6 my-8 flex items-center bg-midnight-200 dark:bg-midnight-800 border border-midnight-300 dark:border-midnight-700 rounded-lg">
            <Text variant="header" size="lg" className="timer">
              {getTaskDuration(session, index)}
            </Text>
            <Text variant="subtitle" className="ml-auto">
              {session.type}
            </Text>
          </Card>
        ))}
      </Card>

      <div className="flex justify-center">
        <Button className="bg-blue-500 hover:bg-blue-400 w-20 h-20 rounded-[50%]" variant="default" onClick={togglePlayPause}>
          {isPlaying ? <BsPauseFill className="icon text-white" /> : <BsPlayFill className="icon text-white" />}
        </Button>
      </div>
    </div>
  )
}




