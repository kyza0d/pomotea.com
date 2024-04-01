
// TimerSettingsContext.js
import React, { createContext, useContext, useState } from 'react';

const TimerSettingsContext = createContext();

export const TimerSettingsProvider = ({ children }) => {
  const [timerSettings, setTimerSettings] = useState([
    { type: 'Working', duration: 25 },
    { type: 'Break', duration: 5 }
  ]);

  const updateTimerSettings = (settings) => {
    setTimerSettings(settings);
  };

  return (
    <TimerSettingsContext.Provider value={{ timerSettings, updateTimerSettings }}>
      {children}
    </TimerSettingsContext.Provider>
  );
};

export const useTimerSettings = () => useContext(TimerSettingsContext);
