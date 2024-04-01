import { useState, useEffect } from 'react';
import { useSettings } from '@/components/Settings/context';

interface Session {
  type: string;
  duration: number;
}

const useTimer = (sessions: Session[]) => {
  const { settings } = useSettings();
  const { 'duration-mode': durationMode } = settings;

  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(new Set<number>());

  const currentSession = sessions[currentSessionIndex];
  const entireDuration = sessions.reduce((total, session) => total + session.duration, 0);

  const duration = durationMode === 'entireLength' ? entireDuration : currentSession.duration;
  const remainingTime = durationMode === 'entireLength' ? entireDuration - elapsedTime : currentSession.duration - elapsedTime;

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (remainingTime <= 0) {
      setCompletedSessions((prevCompletedSessions) => new Set([...prevCompletedSessions, currentSessionIndex]));
      const nextIndex = (currentSessionIndex + 1) % sessions.length;
      setCurrentSessionIndex(nextIndex);
      setElapsedTime(0);
      setKey((prevKey) => prevKey + 1);

      if (nextIndex === 0) {
        setIsPlaying(false);
        setCompletedSessions(new Set());
      }
    }
  }, [currentSessionIndex, remainingTime, sessions]);

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const resetTimer = () => {
    setCurrentSessionIndex(0);
    setElapsedTime(0);
    setIsPlaying(false);
    setKey((prevKey) => prevKey + 1);
    setCompletedSessions(new Set());
  };

  return {
    currentSessionIndex,
    elapsedTime,
    isPlaying,
    key,
    completedSessions,
    duration,
    remainingTime,
    togglePlayPause,
    resetTimer,
  };
};

export default useTimer;
