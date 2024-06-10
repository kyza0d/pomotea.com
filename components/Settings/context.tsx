"use client"

import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem } from '@/utils/indexeddb';

interface Session {
  type: string;
  title: string;
  duration: number;
}

interface Settings {
  'font-name': string;
  'font-size': number;
  'theme': 'light' | 'dark' | 'system';
  'background-url': string;
  'background-opacity': string;
  'background-position': 'fill' | 'center' | 'stretch';
  'notify-breaks': boolean;
  'notify-focus': boolean;
  sessions: Session[];
}

const defaultSettings: Settings = {
  'font-name': 'sans-serif',
  'font-size': 16,
  'theme': 'system',
  'background-url': "",
  'background-opacity': '0.25',
  "background-position": "fill",
  'notify-breaks': true,
  'notify-focus': false,
  sessions: [
    { type: 'Focus', title: "Focus", duration: 30 },
    { type: 'Break', title: "Break", duration: 15 },
    { type: 'Focus', title: "Focus", duration: 45 },
  ],
};

interface SettingsContextValue {
  settings: Settings;
  pendingSettings: Settings;
  setPendingSetting: (name: string, value: any) => void;
  saveSettings: () => void;
  updateSetting: (name: string, value: any) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  pendingSettings: defaultSettings,
  setPendingSetting: () => { },
  saveSettings: () => { },
  updateSetting: () => { },
});

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [pendingSettings, setPendingSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await getItem('settings');
      if (savedSettings) {
        setSettings(savedSettings);
        setPendingSettings(savedSettings);
      }
    };

    loadSettings();
  }, []);

  const setPendingSetting = (name: string, value: any) => {
    setPendingSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const saveSettings = async () => {
    setSettings(pendingSettings);
    await setItem('settings', pendingSettings);
  };

  const updateSetting = (name: string, value: any) => {
    setSettings((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        [name]: value,
      };
      setPendingSettings(newSettings);  // Ensure pendingSettings is also updated
      setItem('settings', newSettings);
      return newSettings;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, pendingSettings, setPendingSetting, saveSettings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => useContext(SettingsContext);
