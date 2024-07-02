"use client"

import React, { useEffect, useState, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card } from "@/components/ui/card";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useSettings } from '@/components/Settings/context';
import useTimer from "@/hooks/useTimer";
import { Text } from "../ui/text";
import { FiRotateCw, FiSettings, FiClock, FiCoffee } from "react-icons/fi";
import { useToast } from '@/components/ui/use-toast';
import { Settings } from "@/components/Settings";

interface Session {
  type: any;
  duration: any;
  title: any;
}

interface SessionControlsProps {
  toggleSettings: () => void;
}

const SessionControls: React.FC<SessionControlsProps> = ({ toggleSettings }) => {
  return (
    <div className="flex space-x-6">
      <div className="backdrop" onClick={toggleSettings}>
        <FiSettings className="icon" />
      </div>
    </div>
  );
};

interface PlayPauseCircleTimerProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  currentSessionIndex: number;
  sessions: any[]; // Change this to any[]
  elapsedTimes: number[];
  settings: {
    colors: {
      accent: string;
      base: string;
    };
  };
}

const PlayPauseCircleTimer: React.FC<PlayPauseCircleTimerProps> = ({ isPlaying, togglePlayPause, currentSessionIndex, sessions, elapsedTimes }) => {
  const { settings } = useSettings();
  return (
    <div onClick={togglePlayPause} className="relative cursor-pointer">
      <div className="text-theme-header absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        {isPlaying ? <BsPauseFill className="icon-lg" /> : <BsPlayFill className="icon-lg" />}
      </div>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        key={`timer-${currentSessionIndex}`}
        duration={sessions[currentSessionIndex]?.duration * 60}
        initialRemainingTime={Math.max(0, sessions[currentSessionIndex]?.duration * 60 - elapsedTimes[currentSessionIndex])}
        colors={settings.colors.accent as any}
        trailColor={settings.colors.base as any}
        isGrowing={sessions[currentSessionIndex]?.type === 'Break'}
        rotation={sessions[currentSessionIndex]?.type === 'Break' ? "counterclockwise" : "clockwise"}
        colorsTime={[sessions[currentSessionIndex]?.type === 'Break' ? 0 : 1, 0.5, 0.5]}
        strokeWidth={8}
        size={100}
      />
    </div>
  );
};

interface SessionItemProps {
  session: Session;
  index: number;
  currentSessionIndex: number;
  getSessionTime: (index: number) => string;
  sessionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const SessionItem: React.FC<SessionItemProps> = ({ session, index, currentSessionIndex, getSessionTime, sessionRefs }) => {
  return (
    <div
      key={index}
      ref={(el) => sessionRefs.current[index] = el}
      className="session"
      id={`session-${index}`}
    >
      <div>
        <div className="px-2 h-20 pt-4 flex items-center">
          {session.type === 'Focus' && <FiClock className="icon-sm" />}
          {session.type === 'Break' && <FiCoffee className="icon-sm" />}
          <Text variant="subtitle" className="ml-4">{session.type}</Text>
        </div>
        <Card className="border border-theme-border px-4 pr-8 h-28 flex items-center rounded-lg transition duration-100">
          <Text variant="header" size="2xl" className="timer">
            {getSessionTime(index)}
          </Text>
          <Text variant="subtitle" className="ml-auto">
            {session.title}
          </Text>
        </Card>
      </div>
    </div>
  );
};

interface SessionListProps {
  sessions: Session[];
  currentSessionIndex: number;
  getSessionTime: (index: number) => string;
  sessionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const SessionList: React.FC<SessionListProps> = ({ sessions, currentSessionIndex, getSessionTime, sessionRefs }) => {
  return (
    <div className="fade-box pb-8">
      <div className="h-[32rem]  pt-8 overflow-y-visible">
        <div className="sessions">
          {sessions.map((session: Session, index: number) => (
            <SessionItem
              key={index}
              session={session}
              index={index}
              currentSessionIndex={currentSessionIndex}
              getSessionTime={getSessionTime}
              sessionRefs={sessionRefs}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Timer: React.FC = () => {
  const { settings } = useSettings();
  const { toast } = useToast();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettings = () => setIsSettingsOpen(prev => !prev);

  const sessionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const resetStyles = () => {
    sessionRefs.current.forEach((ref) => {
      if (ref && ref.parentElement) {
        ref.parentElement.style.transition = 'none';
        ref.parentElement.style.transform = 'none';
      }
    });
  };

  const {
    elapsedTimes,
    isPlaying,
    currentSessionIndex,
    sessions,
    togglePlayPause,
    resetTimer,
    updateSessions,
  } = useTimer(settings.sessions, toast, resetStyles);

  useEffect(() => {
    updateSessions(settings.sessions);
  }, [settings.sessions, updateSessions]);

  useEffect(() => {
    let totalHeight = 0;

    for (let i = 0; i < currentSessionIndex; i++) {
      const prevSession = sessionRefs.current[i];
      if (prevSession) {
        const height = prevSession.clientHeight;
        totalHeight += height;
      }
    }

    const currentSession = sessionRefs.current[currentSessionIndex];

    if (currentSession && currentSession.parentElement) {
      currentSession.parentElement.style.transition = `transform 0.6s ease-in-out`;
      currentSession.parentElement.style.transform = `translateY(-${totalHeight}px)`;
    }
  }, [currentSessionIndex]);

  const getSessionTime = (index: number): string => {
    const session = sessions[index];
    if (!session) return '00:00';

    const remainingTime = Math.max(0, session.duration * 60 - elapsedTimes[index]);
    const roundedTime = Math.round(remainingTime);
    const hours = Math.floor(roundedTime / 3600);
    const minutes = Math.floor((roundedTime % 3600) / 60);
    const seconds = roundedTime % 60;

    const formatTimeUnit = (unit: number) => String(unit).padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`;
    }
    return `${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`;
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center">
          <PlayPauseCircleTimer
            togglePlayPause={togglePlayPause}
            isPlaying={isPlaying}
            currentSessionIndex={currentSessionIndex}
            sessions={sessions as any[]} // Add type assertion here
            settings={settings}
            elapsedTimes={elapsedTimes}
          />
          <div className="ml-4">
            <Text variant="subtitle" size="lg">In progress:</Text>
            <Text variant="header" size="2xl">{sessions[currentSessionIndex]?.title || 'No session'}</Text>
          </div>
          <div className="ml-auto">
            <SessionControls toggleSettings={toggleSettings} />
          </div>
        </div >
        <SessionList
          sessions={sessions}
          currentSessionIndex={currentSessionIndex}
          getSessionTime={getSessionTime}
          sessionRefs={sessionRefs}
        />

        <div className="backdrop" onClick={resetTimer}>
          <FiRotateCw className="icon" />
        </div>
      </div >

      {isSettingsOpen && <Settings toggleSettings={toggleSettings} />}
    </>
  );
};

export default Timer;
