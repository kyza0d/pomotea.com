"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiClock, FiEye, FiSettings } from "react-icons/fi";
import { FontFamily } from "./Appearance/fonts";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import TimerSettings from "./Timer";
import { setItem } from '@/utils/indexeddb';
import { useSettings } from "@/components/Settings/context";

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, setSetting } = useSettings();
  const backdropRef = useRef(null);
  const { setTheme } = useTheme();

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

  const handleSaveChanges = async () => {
    await setItem("settings", settings);
    console.log('Settings saved:', settings);
    setTheme(settings.theme);
    toggleSettings();
  };

  const handleThemeChange = (value: string) => {
    setSetting('theme', value);
    setTheme(value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setSetting('background-url', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpacityChange = (value: string) => {
    setSetting('background-opacity', value);
  };

  const opacityOptions = [0.1, 0.25, 0.5, 0.75, 1.0];

  return (
    <>
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
            <div className="bg-midnight-100 dark:bg-midnight-900 w-[70vw] h-[80vh] rounded-md border border-input overflow-hidden flex flex-col relative">
              <div className="flex-1 overflow-auto">
                <Accordion type="single" collapsible className="w-full px-4">
                  <AccordionItem value="appearance">
                    <AccordionTrigger>
                      <div className="flex"><FiEye className="icon mr-4" /> Appearance</div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col">
                        <div>
                          <h2>Theme:</h2>
                          <p>Select the theme for the interface.</p>
                          e
                          <ToggleGroup type="single" onValueChange={handleThemeChange} value={settings.theme}>
                            <ToggleGroupItem value="light" aria-label="Light Theme">
                              Light
                            </ToggleGroupItem>
                            <ToggleGroupItem value="dark" aria-label="Dark Theme">
                              Dark
                            </ToggleGroupItem>
                            <ToggleGroupItem value="system" aria-label="System Theme">
                              System
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                        <div>
                          <h2>Background:</h2>
                          <p>This is the background image currently being used in the interface.</p>
                          {settings['background-url'] && (
                            <div
                              style={{ backgroundImage: `url(${settings['background-url']})`, maxWidth: 120, maxHeight: 60 }}
                              className="mr-4 h-screen w-full bg-no-repeat bg-cover"
                            />
                          )}
                          <Input type="file" accept="image/*" onChange={handleImageChange} />
                          <h2>Opacity:</h2>
                          <ToggleGroup type="single" onValueChange={handleOpacityChange} value={settings['background-opacity'].toString()}>
                            {opacityOptions.map((value) => (
                              <ToggleGroupItem key={value} value={value.toString()} aria-label={`Opacity ${value * 100}%`}>
                                {Math.round(value * 100)}%
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                          e
                          <h2>Position:</h2>
                          <ToggleGroup type="single" onValueChange={(value) => setSetting('background-position', value)} value={settings['background-position']}>
                            <ToggleGroupItem value="fill" aria-label="Fill">
                              Fill
                            </ToggleGroupItem>
                            <ToggleGroupItem value="center" aria-label="Center">
                              Center
                            </ToggleGroupItem>
                            <ToggleGroupItem value="stretch" aria-label="Stretch">
                              Stretch
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                        <div>
                          <h2>Font Family:</h2>
                          <p>This is the font currently being used in the interface.</p>
                          <FontFamily />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="timers">
                    <AccordionTrigger>
                      <div className="flex"> <FiClock className="icon mr-4" /> Timers</div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <TimerSettings />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <Button className="ml-auto absolute bottom-0 right-0 m-4" variant="outline" onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
