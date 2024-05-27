
"use client"

import React, { ReactNode, createContext, useContext, useState } from 'react';

interface Session {
  type: string;
  duration: number;
}

interface Settings {
  'font-name': string;
  'font-size': number;
  'theme': 'light' | 'dark' | 'system';
  'background-url': string;
  'background-opacity': number; // New setting for background opacity
  'duration-mode': 'entireLength' | 'currentTask';
  sessions: Session[]; // Add sessions to settings
}

const defaultSettings: Settings = {
  'font-name': 'sans-serif',
  'font-size': 16,
  'theme': 'system',
  'background-url': "", // New setting for background image
  'duration-mode': 'entireLength', // Default value for duration mode
  "background-opacity": 0.5, // Default value for background opacity
  sessions: [
    { type: 'Working', duration: 0.1 },
    { type: 'Break', duration: 0.05 },
    { type: 'Working', duration: 0.1 },
  ],
};

interface SettingsContextValue {
  settings: Settings;
  setSetting: (name: string, value: any) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  setSetting: () => { },
});

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const setSetting = (name: string, value: any) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => useContext(SettingsContext);
