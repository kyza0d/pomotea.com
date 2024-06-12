import React, { useEffect, useState } from "react";
import { FaUndoAlt } from "react-icons/fa";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card } from "@/components/ui/card";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useSettings } from '@/components/Settings/context';
import useTimer from "@/hooks/useTimer";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { FiSettings } from "react-icons/fi";
import { useToast } from '@/components/ui/use-toast';
import { Settings } from "@/components/Settings";

const Timer = () => {
  const { settings } = useSettings();
  const { toast } = useToast();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettings = () => setIsSettingsOpen(prev => !prev);

  const {
    elapsedTimes,
    isPlaying,
    currentSessionIndex,
    sessions,
    togglePlayPause,
    resetTimer,
    updateSessions,
  } = useTimer(settings.sessions, toast);

  useEffect(() => {
    updateSessions(settings.sessions);
  }, [settings.sessions, updateSessions]);

  const getSessionTime = (index: number) => {
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
      <div className="mx-auto pt-14 max-w-screen-md sm:px-4 md:px-8 px-10">
        <Card className="space-y-8  w-full bg-transparent dark:bg-transparent mb-6">
          <div className="flex items-center justify-between space-x-6">
            <div className="flex items-center">
              <div onClick={togglePlayPause} className="relative cursor-pointer ">
                <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                  {isPlaying ? <BsPauseFill className="icon-lg text-white" /> : <BsPlayFill className="icon-lg text-white" />}
                </div>
                <CountdownCircleTimer
                  isPlaying={isPlaying}
                  key={`timer-${currentSessionIndex}`}
                  duration={sessions[currentSessionIndex]?.duration * 60}
                  initialRemainingTime={Math.max(0, sessions[currentSessionIndex]?.duration * 60 - elapsedTimes[currentSessionIndex])}
                  colors={["#3B82F6", "#3B82F6", "#3B82F6"]}
                  isGrowing={sessions[currentSessionIndex]?.type === 'Break' ? true : false}
                  rotation={sessions[currentSessionIndex]?.type === 'Break' ? "counterclockwise" : "clockwise"}
                  colorsTime={[sessions[currentSessionIndex]?.type === 'Break' ? 0 : 1, 0.5, 0.5]}
                  trailColor="#0D1A26"
                  strokeWidth={10}
                  size={125}
                />
              </div>
              <div className="ml-4">
                <Text variant="subtitle" size="lg">In progress:</Text>
                <Text variant="header" size="2xl">{sessions[currentSessionIndex]?.title || 'No session'}</Text>
              </div>
            </div>
            <Button variant="ghost" onClick={toggleSettings} className="h-16 w-16 rounded-[50%]">
              <FiSettings className="icon" />
            </Button>
          </div>
          {sessions.map((session, index) => (
            <div className="pt-4">
              <Text className="ml-2 mb-0" variant="header" size="lg">{session.type}</Text>
              <Card
                key={index}
                className={`px-4 pr-8 py-6 my-8 mt-4 flex items-center bg-midnight-200 dark:bg-midnight-800 border border-midnight-300 dark:border-midnight-700 rounded-lg ${index === currentSessionIndex ? 'outline outline-2 outline-blue-500' : ''}`}
              >
                <Text variant="header" size="2xl" className="timer">
                  {getSessionTime(index)}
                </Text>
                <Text variant="subtitle" className="ml-auto">
                  {session.title}
                </Text>
              </Card>
            </div>
          ))}
        </Card>
        <Button variant="ghost" onClick={resetTimer} className="float-right h-16 w-16 rounded-[50%]">
          <FaUndoAlt className="icon" />
        </Button>
      </div >
      {isSettingsOpen && <Settings toggleSettings={toggleSettings} />
      }
    </>
  );
};

export default Timer;
