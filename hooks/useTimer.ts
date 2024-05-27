import { useState, useEffect, useCallback } from 'react';
import useAudio from './useAudio';

interface Session {
  type: string;
  duration: number;
}

const useTimer = (initialSessions: Session[], showToast: (options: { title: string; description: string }) => void) => {
  const [sessions, setSessions] = useState(initialSessions);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);

  const playSound = useAudio('/system-notification-199277.mp3'); // Replace with your sound file path

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying && currentSessionIndex < sessions.length) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => {
          const sessionDuration = sessions[currentSessionIndex].duration * 60;
          if (prevElapsedTime < sessionDuration) {
            return prevElapsedTime + 1;
          } else {
            // Session completed, move to the next session
            showToast({
              title: 'Session Complete',
              description: 'You have completed the current session.'
            });
            playSound();
            setElapsedTime(0);
            setCurrentSessionIndex((prevIndex) => {
              if (prevIndex + 1 < sessions.length) {
                return prevIndex + 1;
              } else {
                // All sessions completed, stop the timer
                setIsPlaying(false);
                return prevIndex;
              }
            });
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, sessions, currentSessionIndex, showToast, playSound]);

  const resetTimer = () => {
    setElapsedTime(0);
    setIsPlaying(false);
    setCurrentSessionIndex(0);
  };

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const updateSessions = useCallback((newSessions: Session[]) => {
    setSessions(newSessions);
    resetTimer();
  }, []);

  return {
    elapsedTime,
    isPlaying,
    currentSessionIndex,
    sessions,
    togglePlayPause,
    resetTimer,
    updateSessions,
  };
};

export default useTimer;
