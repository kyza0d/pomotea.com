"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from "react";

import { FontFamily } from "./font-family"
import { FontSize } from "./font-size";
import { Theme } from "./theme";
import { Background } from "./background";

import { TypographyBold, TypographyP } from "@/components/ui/typeography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FiSettings } from "react-icons/fi";
import { DurationMode } from "./duration-mode";

const SettingsContext = createContext({ isOpen: false, toggleSettings: () => { } });

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [activeTab, setActiveTab] = useState('settings'); // 'home' as the default tab
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
      className={`px-4 py-2 ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}
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
            className="fixed inset-0 bg-black opacity-70 z-40"
            onClick={handleBackdropClick}
          ></div>

          <div className="relative z-50">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[70vw] h-[80vh] rounded-md bg-neutral-50 dark:bg-midnight-900 border border-input overflow-hidden flex flex-col">
              <div className="flex w-full px-4 py-2 z-10 border-b border-b-input">
                <div className="flex items-center space-x-2">
                  <Tab id="settings" setActiveTab={setActiveTab} activeTab={activeTab}>Settings</Tab>
                  <Tab id="timers" setActiveTab={setActiveTab} activeTab={activeTab}>Timers</Tab>
                </div>
              </div>
              <div className="flex-1 space-y-8 overflow-auto px-6 py-8">
                {activeTab === 'settings' && (
                  <>
                    <Card>
                      <TypographyBold>Duration Mode:</TypographyBold>
                      <TypographyP className="mb-4">This is the duration mode currently being used in the interface.</TypographyP>
                      <DurationMode />
                    </Card>

                    <Card>
                      <TypographyBold>Theme:</TypographyBold>
                      <TypographyP className="mb-4">This is the current theme being used in the interface.</TypographyP>
                      <Theme />
                    </Card>

                    <Card>
                      <TypographyBold>Background:</TypographyBold>
                      <TypographyP className="mb-4">This is the background image currently being used in the interface.</TypographyP>
                      <Background />
                    </Card>

                    <Card>
                      <TypographyBold>Font Family:</TypographyBold>
                      <TypographyP className="mb-4">This is the font currently being used in the interface.</TypographyP>
                      <FontFamily />
                    </Card>

                    <Card>
                      <TypographyBold>Font Size:</TypographyBold>
                      <TypographyP className="mb-4">This is the size of the font currently being used in the interface.</TypographyP>
                      <FontSize />
                    </Card>

                  </>
                )}
                {activeTab === 'timers' && (
                  <div>
                    {/* Add timer settings here */}
                  </div>
                )}
              </div>
              <div className="w-full flex px-4 py-2 bg-midnight-800 z-10">
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
