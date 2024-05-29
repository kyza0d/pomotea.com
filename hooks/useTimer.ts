import { useState, useEffect, useCallback } from 'react';
import useAudio from './useAudio';

interface Session {
  type: string;
  duration: number;
}

const useTimer = (initialSessions: Session[], showToast: (options: { title: string; description: string }) => void) => {
  const [sessions, setSessions] = useState(initialSessions);
  const [elapsedTimes, setElapsedTimes] = useState(Array(initialSessions.length).fill(0));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);

  const playSound = useAudio('/system-notification-199277.mp3'); // Replace with your sound file path

  const resetTimer = useCallback(() => {
    setElapsedTimes(Array(sessions.length).fill(0));
    setIsPlaying(false);
    setCurrentSessionIndex(0);
  }, [sessions.length]);

  const handleSessionComplete = useCallback(() => {
    if (currentSessionIndex + 1 < sessions.length) {
      setCurrentSessionIndex(currentSessionIndex + 1);
    } else {
      showToast({
        title: 'All Sessions Complete',
        description: 'You have completed all sessions.',
      });
      playSound();
      resetTimer();
    }
  }, [currentSessionIndex, sessions.length, showToast, playSound, resetTimer]);

  const incrementElapsedTime = useCallback(() => {
    setElapsedTimes((prevElapsedTimes) => {
      const newElapsedTimes = [...prevElapsedTimes];
      const sessionDuration = sessions[currentSessionIndex].duration * 60;
      if (newElapsedTimes[currentSessionIndex] < sessionDuration) {
        newElapsedTimes[currentSessionIndex] += 1;
      } else {
        handleSessionComplete();
      }
      return newElapsedTimes;
    });
  }, [currentSessionIndex, handleSessionComplete, sessions]);

  useEffect(() => {
    if (isPlaying && currentSessionIndex < sessions.length) {
      const intervalId = setInterval(incrementElapsedTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, currentSessionIndex, incrementElapsedTime, sessions.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }, []);

  const updateSessions = useCallback((newSessions: Session[]) => {
    setSessions(newSessions);
    setElapsedTimes(Array(newSessions.length).fill(0));
    setCurrentSessionIndex(0);
  }, []);

  return {
    elapsedTimes,
    isPlaying,
    currentSessionIndex,
    sessions,
    togglePlayPause,
    resetTimer,
    updateSessions,
  };
};

export default useTimer;
