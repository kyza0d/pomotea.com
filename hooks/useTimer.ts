import { useState, useEffect } from 'react';

interface Session {
  type: string;
  duration: number;
}

const useTimer = (sessions: Session[]) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(new Set<number>());
  const [key, setKey] = useState(0);

  const entireDuration = sessions.reduce((total, session) => total + session.duration, 0) + 1;
  const remainingTime = entireDuration - elapsedTime;

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying && remainingTime >= 0) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => {
          if (prevElapsedTime < entireDuration) {
            return prevElapsedTime + 1;
          } else {
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

  const resetTimer = () => {
    setElapsedTime(0);
    setIsPlaying(false);
    setCompletedSessions(new Set());
    setKey((prevKey) => prevKey + 1);
  };

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return { key, elapsedTime, isPlaying, completedSessions, duration: entireDuration, remainingTime, togglePlayPause, resetTimer, };
};

export default useTimer;
