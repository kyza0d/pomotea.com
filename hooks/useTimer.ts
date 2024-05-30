import { useState, useEffect, useCallback, useRef } from 'react';
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

  const animationFrameId = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  const resetTimer = useCallback(() => {
    setElapsedTimes(Array(sessions.length).fill(0));
    setIsPlaying(false);
    setCurrentSessionIndex(0);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
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

  const updateElapsedTime = useCallback((timestamp: number) => {
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = timestamp;
    }

    const deltaTime = (timestamp - lastUpdateTimeRef.current) / 1000; // Convert to seconds
    lastUpdateTimeRef.current = timestamp;

    setElapsedTimes((prevElapsedTimes) => {
      const newElapsedTimes = [...prevElapsedTimes];
      const sessionDuration = sessions[currentSessionIndex].duration * 60;

      if (newElapsedTimes[currentSessionIndex] < sessionDuration) {
        newElapsedTimes[currentSessionIndex] += deltaTime;
        if (newElapsedTimes[currentSessionIndex] >= sessionDuration) {
          handleSessionComplete();
        }
      }

      return newElapsedTimes;
    });

    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(updateElapsedTime);
    }
  }, [currentSessionIndex, handleSessionComplete, isPlaying, sessions]);

  useEffect(() => {
    if (isPlaying && currentSessionIndex < sessions.length) {
      animationFrameId.current = requestAnimationFrame(updateElapsedTime);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, currentSessionIndex, updateElapsedTime, sessions.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    if (!isPlaying) {
      lastUpdateTimeRef.current = performance.now();
      animationFrameId.current = requestAnimationFrame(updateElapsedTime);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
  }, [isPlaying, updateElapsedTime]);

  const updateSessions = useCallback((newSessions: Session[]) => {
    setSessions(newSessions);
    setElapsedTimes(Array(newSessions.length).fill(0));
    setCurrentSessionIndex(0);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
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
