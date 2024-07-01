"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import useAudio from './useAudio';
import { useSettings } from '@/components/Settings/context';
import { FiCheckCircle, FiCoffee, FiBell } from 'react-icons/fi';

// Interface for session details
interface Session {
  type: string;
  title: string;
  duration: number;
}

// Custom hook for managing the timer functionality
const useTimer = (initialSessions: Session[], showToast: (options: { title: string; description: string; icon?: React.ReactNode }) => void, resetStyles: () => void) => {
  // State variables
  const [sessions, setSessions] = useState(initialSessions);
  const [elapsedTimes, setElapsedTimes] = useState(Array(initialSessions.length).fill(0));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [completionMessage, setCompletionMessage] = useState<{ title: string; description: string, icon?: React.ReactNode } | null>(null);

  const { settings } = useSettings();

  // Hook to handle audio playback
  const playSound = useAudio('/system-notification-199277.mp3'); // Replace with your sound file path

  // Refs for managing animation frame and timeout
  const animationFrameId = useRef<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  // Function to format time in mm:ss format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Function to update the document title with the current session and elapsed time
  const updateDocumentTitle = (elapsed: number) => {
    const session = sessions[currentSessionIndex];
    document.title = `${session.type} - ${formatTime(elapsed)} / ${formatTime(session.duration * 60)}`;
  };

  // Function to reset the timer state
  const resetTimer = useCallback(() => {
    setElapsedTimes(Array(sessions.length).fill(0));
    setIsPlaying(false);
    setCurrentSessionIndex(0);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    const sessionElements = document.querySelectorAll('.session');
    sessionElements.forEach((element) => {
      element.classList.remove('session-exit-up');
    });
    document.title = 'Timer Reset';
    resetStyles();
  }, [sessions.length, resetStyles]);

  const renderIcon = (Icon: React.ElementType) => <Icon className="h-5 w-5 text-theme-accent" />

  // Function to handle the completion of a session
  const handleSessionComplete = useCallback(() => {
    const currentSessionElement = document.querySelector(`#session-${currentSessionIndex}`);
    if (currentSessionElement) {
      currentSessionElement.classList.add('session-exit-up');
    }
    if (currentSessionIndex + 1 < sessions.length) {
      startNextSession();
    } else {
      setCompletionMessage({
        title: 'All Sessions Complete',
        description: 'You have completed all sessions.',
        icon: renderIcon(FiCheckCircle)
      });
      // remove classes for all sessions
      playSound();
      resetTimer();
    }
  }, [currentSessionIndex, sessions.length, playSound, resetTimer]);

  // Function to start the next session
  const startNextSession = useCallback(() => {
    const nextSessionIndex = currentSessionIndex + 1;
    const nextSession = sessions[nextSessionIndex];

    if (nextSession?.type === 'Break' && settings['notify-breaks']) {
      setCompletionMessage({
        title: 'Time to Break',
        description: '',
        icon: renderIcon(FiCoffee)
      });
      playSound();
    }

    if (nextSession?.type === 'Focus' && settings['notify-focus']) {
      setCompletionMessage({
        title: 'Focus Time',
        description: '',
        icon: renderIcon(FiBell)
      });
      playSound();
      playSound();
    }

    if (nextSession?.type === 'Focus' && settings['notify-focus']) {
      setCompletionMessage({
        title: 'Focus Time',
        description: '',
        icon: renderIcon(FiBell)
      });
      playSound();
    }

    setCurrentSessionIndex(nextSessionIndex);
  }, [currentSessionIndex, sessions, settings, playSound]);

  // Effect to show a toast message when a completion message is set
  useEffect(() => {
    if (completionMessage) {
      showToast(completionMessage);
      setCompletionMessage(null); // Clear the message after showing the toast
    }
  }, [completionMessage, showToast]);

  // Function to update the elapsed time using requestAnimationFrame
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

      updateDocumentTitle(newElapsedTimes[currentSessionIndex]);

      return newElapsedTimes;
    });

    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(updateElapsedTime);
    }
  }, [currentSessionIndex, handleSessionComplete, isPlaying, sessions]);

  // Function to update the elapsed time using setTimeout as a fallback
  const updateElapsedTimeFallback = useCallback(() => {
    if (!isPlaying) return;

    const now = performance.now();
    const deltaTime = (now - lastUpdateTimeRef.current) / 1000; // Convert to seconds
    lastUpdateTimeRef.current = now;

    setElapsedTimes((prevElapsedTimes) => {
      const newElapsedTimes = [...prevElapsedTimes];
      const sessionDuration = sessions[currentSessionIndex].duration * 60;

      if (newElapsedTimes[currentSessionIndex] < sessionDuration) {
        newElapsedTimes[currentSessionIndex] += deltaTime;
        if (newElapsedTimes[currentSessionIndex] >= sessionDuration) {
          handleSessionComplete();
        }
      }

      updateDocumentTitle(newElapsedTimes[currentSessionIndex]);

      return newElapsedTimes;
    });

    timeoutId.current = setTimeout(updateElapsedTimeFallback, 1000);
  }, [currentSessionIndex, handleSessionComplete, isPlaying, sessions]);

  // Effect to manage the play/pause state and set up the animation frame and timeout
  useEffect(() => {
    if (isPlaying && currentSessionIndex < sessions.length) {
      animationFrameId.current = requestAnimationFrame(updateElapsedTime);
      timeoutId.current = setTimeout(updateElapsedTimeFallback, 1000);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [isPlaying, currentSessionIndex, updateElapsedTime, updateElapsedTimeFallback, sessions.length]);

  // Function to toggle play/pause state
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    if (!isPlaying) {
      lastUpdateTimeRef.current = performance.now();
      animationFrameId.current = requestAnimationFrame(updateElapsedTime);
      timeoutId.current = setTimeout(updateElapsedTimeFallback, 1000);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    }
  }, [isPlaying, updateElapsedTime, updateElapsedTimeFallback]);

  // Function to update sessions and reset the timer state
  const updateSessions = useCallback((newSessions: Session[]) => {
    setSessions(newSessions);
    setElapsedTimes(Array(newSessions.length).fill(0));
    setCurrentSessionIndex(0);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, []);

  // Return the state and functions to be used in the component
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
