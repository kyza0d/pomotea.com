import React, { useEffect } from "react";
import { FaUndoAlt } from "react-icons/fa";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card } from "@/components/ui/card";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useSettings } from '@/components/Settings/context';
import useTimer from "@/hooks/useTimer";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { Settings } from "../Settings";
import { useToast } from '@/components/ui/use-toast';

const Timer: React.FC = () => {
  const { settings } = useSettings();
  const { toast } = useToast();

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

  const getSessionTime = (index) => {
    const session = sessions[index];
    if (!session) return '00:00';
    const remainingTime = session.duration * 60 - elapsedTimes[index];
    return new Date(remainingTime * 1000).toISOString().substr(14, 5);
  };

  return (
    <div className="mx-auto pt-8 max-w-screen-md">
      <Card className="space-y-8 w-full bg-transparent dark:bg-transparent mb-6">
        <div className="flex items-center justify-between space-x-6">
          <div className="flex items-center">
            <CountdownCircleTimer
              key={`${settings['duration-mode']}-${currentSessionIndex}`}
              strokeWidth={16}
              size={115}
              colors={["#5be59c", "#e5ae5b", "#e55b5b"]}
              colorsTime={[sessions[currentSessionIndex]?.duration * 24, sessions[currentSessionIndex]?.duration * 12, 0]}
              trailColor="#1b1e21"
              duration={sessions[currentSessionIndex]?.duration * 60 || 0}
              initialRemainingTime={sessions[currentSessionIndex]?.duration * 60 - elapsedTimes[currentSessionIndex]}
              isPlaying={isPlaying}
            />
            <div className="ml-4">
              <Text variant="subtitle" size="md">Current Task:</Text>
              <Text variant="header" size="lg">{sessions[currentSessionIndex]?.type || 'No session'}</Text>
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
              {getSessionTime(index)}
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
  );
};

export default Timer;
