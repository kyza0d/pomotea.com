"use client"

import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { FaUndoAlt } from "react-icons/fa";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card } from "@/components/ui/card";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { Settings } from "@/components/Settings";
import { TypographyLarge, TypographyH1, TypographyH3 } from "@/components/ui/typeography";
import { Button } from "@/components/ui/button";

import useTimer from "@/hooks/useTimer";

import { useSettings } from '@/components/Settings/context';

const Home = () => {
  const sessions = [
    { type: 'Working', duration: 6 },
    { type: 'Break', duration: 3 },
    { type: 'Working', duration: 6 },
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
    <main>
      <Card className="space-y-8 w-full bg-transparent dark:bg-transparent">
        <div className="flex items-center space-x-6">
          <div className="circle">
            <CountdownCircleTimer
              key={`${durationMode}-${key}`}
              strokeWidth={8}
              size={54}
              colors={["#5be59c", "#e5ae5b", "#e55b5b"]}
              colorsTime={[duration * 0.4, duration * 0.2, 0]}
              trailColor="#1b1e21"
              duration={duration}
              initialRemainingTime={remainingTime}
              isPlaying={isPlaying}
              renderAriaTime={(remainingTime) => moment.utc(remainingTime * 1000).format('mm:ss')}
            />
          </div>
          <TypographyH1>Study</TypographyH1>
        </div>
        {sessions.map((session, index) => (
          <Card key={index} className="px-4 pr-8 py-6 my-8 flex items-center">
            <TypographyLarge className="timer">
              {getTaskDuration(session, index)}
            </TypographyLarge>
            <TypographyH3 className="ml-auto text-gray-300 dark:text-gray-500">
              {session.type}
            </TypographyH3>
          </Card>
        ))}
      </Card>

      <div className="actions">
        <Settings />
        <Button variant="ghost" onClick={resetTimer}>
          <FaUndoAlt className="icon" />
        </Button>
        <Button variant="ghost" onClick={togglePlayPause}>
          {isPlaying ? <BsPauseFill className="icon" /> : <BsPlayFill className="icon" />}
        </Button>
      </div>
    </main>
  );
};

export default Home;
