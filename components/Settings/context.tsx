
"use client"

import React, { ReactNode, createContext, useContext, useState } from 'react';

interface Settings {
  'font-name': string;
  'font-size': number;
  'theme': 'light' | 'dark' | 'system';
  'background-url': string;
  'duration-mode': 'entireLength' | 'currentTask'; // New setting for duration mode
}

const defaultSettings: Settings = {
  'font-name': 'sans-serif',
  'font-size': 16,
  'theme': 'system',
  'background-url': "", // New setting for background image
  'duration-mode': 'entireLength', // Default value for duration mode
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
