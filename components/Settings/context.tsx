"use client"

import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem } from '@/utils/indexeddb';

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
  'background-position': 'fill' | 'center' | 'stretch'; // New setting for background position
  sessions: Session[]; // Add sessions to settings
}

const defaultSettings: Settings = {
  'font-name': 'sans-serif',
  'font-size': 16,
  'theme': 'system',
  'background-url': "", // New setting for background image
  "background-opacity": 0.5, // Default value for background opacity
  "background-position": "fill", // Default background position
  sessions: [
    { type: 'Working', duration: 0.1 },
    { type: 'Break', duration: 0.1 },
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

  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await getItem('settings');
      if (savedSettings) {
        setSettings(savedSettings);
      }
    };

    loadSettings();
  }, []);

  const setSetting = async (name: string, value: any) => {
    setSettings((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        [name]: value,
      };
      setItem('settings', newSettings);
      return newSettings;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => useContext(SettingsContext);
