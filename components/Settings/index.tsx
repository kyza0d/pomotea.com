"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from "react";

import { FontFamily } from "./Appearance/fonts"
import { Theme } from "./Appearance/theme";
import { Background } from "./Appearance/background";

import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FiSettings, FiClock, FiEye, FiBell } from "react-icons/fi";

const SettingsContext = createContext({ isOpen: false, toggleSettings: () => { } });

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  const backdropRef = useRef(null);

  const toggleSettings = () => setIsOpen(prevIsOpen => !prevIsOpen);

  const handleBackdropClick = (event: any) => {
    event.target === backdropRef.current && toggleSettings();
  };

  useEffect(() => {
    document.addEventListener("click", handleBackdropClick);
    return () => {
      document.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  useEffect(() => {
    const savedValue = localStorage.getItem("isChecked");
    if (savedValue !== null) {
      setIsChecked(JSON.parse(savedValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isChecked", JSON.stringify(isChecked));
  }, [isChecked]);

  interface TabProps {
    id: string;
    children: React.ReactNode; // This type is appropriate for anything that can be rendered: numbers, strings, elements or an array containing these types.
    setActiveTab: (tab: string) => void;
    activeTab: string;
  }

  const Tab: React.FC<TabProps> = ({ id: tab, children, setActiveTab, activeTab }) => (
    <Button
      variant={activeTab === tab ? 'outline' : 'ghost'}
      className={`px-4 py-2 ${activeTab === tab ? 'bg-midnight-200 hover:bg-midnight-300 dark:bg-midnight-700 dark:hover:bg-midnight-600' : 'bg-midnight-100 hover:bg-midnight-200 dark:bg-midnight-800 dark:hover:bg-midnight-700'} rounded-md`}
      onClick={() => setActiveTab(tab)}
    >
      {children}
    </Button>
  );

  return (
    <SettingsContext.Provider value={{ isOpen, toggleSettings }}>

      <Button variant="ghost" size="icon" onClick={toggleSettings}>
        <FiSettings className="icon" />
      </Button>

      {isOpen && (
        <>
          <div
            ref={backdropRef}
            className="fixed inset-0 opacity-70 z-40"
            onClick={handleBackdropClick}
          ></div>

          <div className="fixed z-50">
            <div className="bg-midnight-100 dark:bg-midnight-900 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[70vw] h-[80vh] rounded-md border border-input overflow-hidden flex flex-col">
              <div className="flex w-full px-4 py-2 z-10 border-b border-b-input">
                <div className="flex items-center space-x-2">
                  <Tab id="appearance" setActiveTab={setActiveTab} activeTab={activeTab}> <FiEye className="icon-sm mr-4" /> Appearance</Tab>
                  <Tab id="timers" setActiveTab={setActiveTab} activeTab={activeTab}> <FiClock className="icon-sm mr-4" /> Timers</Tab>
                  <Tab id="notifications" setActiveTab={setActiveTab} activeTab={activeTab}> <FiBell className="icon-sm mr-4" /> Notifications</Tab>
                  <Tab id="settings" setActiveTab={setActiveTab} activeTab={activeTab}> <FiSettings className="icon-sm mr-4" /> Settings</Tab>
                </div>
              </div>
              <div className="flex-1 space-y-8 overflow-auto px-6 py-8">
                {activeTab === 'settings' && (
                  <>


                    {/*
                      <Card>
                        <Text>Font Size:</Text>
                        <Text className="mb-4">This is the size of the font currently being used in the interface.</Text>
                        <FontSize />
                      </Card>
                    */}

                  </>
                )}
                {activeTab === 'timers' && (
                  <div>
                    {/* Add timer settings here */}
                  </div>
                )}
                {activeTab === 'appearance' && (
                  <div className="flex flex-col space-y-6">
                    <Card>
                      <Text variant="subtitle" >Theme:</Text>
                      <Text size="sm" className="mb-4">This is the current theme being used in the interface.</Text>
                      <Theme />
                    </Card>
                    <Card>
                      <Text variant="subtitle">Background:</Text>
                      <Text size="sm" className="mb-4">This is the background image currently being used in the interface.</Text>
                      <Background />
                    </Card>
                    <Card>
                      <Text variant="subtitle">Font Family:</Text>
                      <Text size="sm" className="mb-4">This is the font currently being used in the interface.</Text>
                      <FontFamily />
                    </Card>
                  </div>
                )}
              </div>
              <div className="w-full flex px-4 py-2 z-10 border-t border-t-input">
                <Button variant="default" onClick={toggleSettings}>Save</Button>
                <Button className="ml-4" variant="secondary" onClick={toggleSettings}>Cancel</Button>
                <Button className="ml-auto" variant="secondary" onClick={toggleSettings}>Restore Defaults</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { Settings, useSettings };
