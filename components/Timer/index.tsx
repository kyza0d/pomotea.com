import React, { useEffect, useState } from "react";
import { FaUndoAlt } from "react-icons/fa";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card } from "@/components/ui/card";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useSettings } from '@/components/Settings/context';
import useTimer from "@/hooks/useTimer";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { FiBell, FiCoffee, FiSettings } from "react-icons/fi";
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
      <div className="mx-auto pt-14 max-w-3xl sm:px-4 md:px-8 px-10">
        <div className="space-y-8  w-full bg-transparent dark:bg-transparent mb-6">
          <div className="flex items-center justify-between space-x-6">
            <div className="flex items-center">
              <div onClick={togglePlayPause} className="relative cursor-pointer ">
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

                  isGrowing={sessions[currentSessionIndex]?.type === 'Break' ? true : false}
                  rotation={sessions[currentSessionIndex]?.type === 'Break' ? "counterclockwise" : "clockwise"}
                  colorsTime={[sessions[currentSessionIndex]?.type === 'Break' ? 0 : 1, 0.5, 0.5]}
                  strokeWidth={8}
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
            <div className="pt-4" key={index}>
              <Text className="ml-2 mb-0 " variant="header" size="lg">{session.type}</Text>
              <Card
                className="px-4 pr-8 py-6 my-8 mt-4 flex items-center rounded-lg"
              >
                {/* Either a PaperClip or Coffee icon based on session type */}
                <div className={`mr-4 p-2 ${currentSessionIndex === index ? 'text-theme-accent' : 'text-theme-subtitle'}`}>
                  {session.type === 'Break' ? <FiCoffee size={28} /> : <FiBell size={28}
                  />}
                </div>
                <Text variant="header" size="2xl" className="timer">
                  {getSessionTime(index)}
                </Text>
                <Text variant="subtitle" className="ml-auto">
                  {session.title}
                </Text>
              </Card>
            </div>
          ))}
        </div>
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
