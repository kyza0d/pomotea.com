import React from 'react';
import { useSettings } from '@/components/Settings/context';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface TimerDisplayProps {
  sessions: { type: string; duration: number }[];
  currentSessionIndex: number;
  elapsedTime: number;
  isPlaying: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ sessions, currentSessionIndex, elapsedTime, isPlaying }) => {
  const { settings } = useSettings();
  const { 'duration-mode': durationMode } = settings;

  const currentSession = sessions[currentSessionIndex];
  const entireDuration = sessions.reduce((total, session) => total + session.duration, 0);

  const duration = durationMode === 'entireLength' ? entireDuration : currentSession.duration;
  const remainingTime = duration - elapsedTime;

  return (
    <div className="circle">
      <CountdownCircleTimer
        strokeWidth={8}
        size={54}
        colors={["#5be59c", "#e5ae5b", "#e55b5b"]}
        colorsTime={[duration * 0.4, duration * 0.2, 0]}
        trailColor="#1b1e21"
        duration={duration}
        initialRemainingTime={remainingTime}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default TimerDisplay;
