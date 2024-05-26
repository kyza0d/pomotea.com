import { useState, useEffect, useRef, useCallback } from 'react';
import useAudio from './useAudio';

interface Session {
  type: string;
  duration: number;
}

const useTimer = (initialSessions: Session[], showToast: (options: { title: string; description: string }) => void) => {
  const [sessions, setSessions] = useState(initialSessions);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(new Set<number>());
  const [key, setKey] = useState(0);

  const originalSessions = useRef(sessions.map(session => session.duration));
  const entireDuration = originalSessions.current.reduce((total, duration) => total + duration, 0);
  const remainingTime = entireDuration - elapsedTime;

  const prevRemainingTimeRef = useRef(remainingTime);
  const playSound = useAudio('/system-notification-199277.mp3'); // Replace with your sound file path

  useEffect(() => {
    originalSessions.current = sessions.map(session => session.duration);
  }, [sessions]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying && remainingTime >= 0) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => {
          if (prevElapsedTime < entireDuration) {
            return prevElapsedTime + 1;
          } else {
            console.log('Timer completed');
            setIsPlaying(false);
            setCompletedSessions(new Set(sessions.map((_, index) => index)));
            return prevElapsedTime;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, remainingTime, entireDuration, sessions]);

  useEffect(() => {
    if (remainingTime === 0 && prevRemainingTimeRef.current > 0) {
      showToast({
        title: 'Session Complete',
        description: 'You have completed the current session.'
      });
      playSound(); // Play the sound when the session is complete
      setTimeout(() => {
        resetTimer(); // Ensure resetTimer is called
      }, 1000);
    }
    prevRemainingTimeRef.current = remainingTime;
  }, [remainingTime, showToast, playSound]);

  const resetTimer = () => {
    setElapsedTime(0);
    setIsPlaying(false);
    setCompletedSessions(new Set());
    setKey((prevKey) => prevKey + 1);
  };

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const updateSessions = useCallback((newSessions: Session[]) => {
    setSessions(newSessions);
  }, []);

  return { key, elapsedTime, isPlaying, completedSessions, duration: entireDuration, remainingTime, togglePlayPause, resetTimer, updateSessions, sessions, originalSessions };
};

export default useTimer;
