"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { FiSettings, FiClock, FiEye, FiBell } from "react-icons/fi";

import { FontFamily } from "./Appearance/fonts";
import { Theme } from "./Appearance/theme";
import { Background } from "./Appearance/background";

import { Text } from "@/components/ui/text";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TimerSettings from "./Timer";

const SettingsContext = createContext({ isOpen: false, toggleSettings: () => { } });

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const backdropRef = useRef(null);

  const toggleSettings = () => setIsOpen((prevIsOpen) => !prevIsOpen);

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

  return (
    <SettingsContext.Provider value={{ isOpen, toggleSettings }}>
      <Button variant="ghost" size="icon" onClick={toggleSettings}>
        <FiSettings className="icon" />
      </Button>

      {isOpen && (
        <>
          <div
            ref={backdropRef}
            className="fixed inset-0 opacity-70 z-40 bg-black"
            onClick={handleBackdropClick}
          ></div>

          <div className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="bg-midnight-100 dark:bg-midnight-900 w-[70vw] h-[80vh] rounded-md border border-input overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto">
                <Tabs defaultValue="appearance" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 sticky top-0">
                    <TabsTrigger value="appearance">
                      <FiEye className="icon-sm mr-4" /> Appearance
                    </TabsTrigger>
                    <TabsTrigger value="timers">
                      <FiClock className="icon-sm mr-4" /> Timers
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                      <FiBell className="icon-sm mr-4" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                      <FiSettings className="icon-sm mr-4" /> Settings
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="appearance" className="space-y-8">
                    <div className="flex flex-col space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Theme:</CardTitle>
                          <CardDescription>This is the current theme being used in the interface.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Theme />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Background:</CardTitle>
                          <CardDescription>This is the background image currently being used in the interface.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Background />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Font Family:</CardTitle>
                          <CardDescription>This is the font currently being used in the interface.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <FontFamily />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="timers" className="space-y-8">
                    <TimerSettings />
                  </TabsContent>
                </Tabs>
              </div>
              <div className="w-full flex px-4 py-2 z-10 border-t border-t-input sticky bottom-0 bg-midnight-100 dark:bg-midnight-900">
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
