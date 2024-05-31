"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { FiClock, FiEye, FiSettings } from "react-icons/fi";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import TimerSettings from "./Timer";
import { useSettings } from "@/components/Settings/context";
import { Text } from "@/components/ui/text";

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

  const fontSizeOptions = [12, 14, 16, 18, 20, 24];

  const handleFontSizeChange = (value: string) => {
    const size = parseInt(value, 10);
    setSetting('font-size', size);
  };

  const fontOptions = [
    { value: "inter", label: 'Inter' },
    { value: "jetbrains-mono", label: 'JetBrains Mono' },
    { value: "manrope", label: 'Manrope' },
    { value: "roboto-mono", label: 'Roboto Mono' },
  ];

  const handleFontChange = (value: string) => {
    setSetting('font-name', value);
  };

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
            <div className="bg-midnight-100 dark:bg-midnight-900 w-[85vw] h-[80vh] rounded-md border border-input overflow-hidden flex flex-col relative">
              <div className="flex-1 overflow-auto">
                <Accordion type="single" collapsible className="w-full px-4">
                  <AccordionItem value="appearance">
                    <AccordionTrigger>
                      <div className="flex"><FiEye className="icon mr-4" /> <Text variant="header">Appearance</Text></div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-10">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Text variant="header">Theme:</Text>
                            <Text>Select the theme for the interface.</Text>
                          </div>
                          <div>
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
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Text variant="header">Background:</Text>
                            <Text>This is the background image currently being used in the interface.</Text>
                          </div>
                          <div className="flex">
                            {settings['background-url'] && (
                              <div
                                style={{ backgroundImage: `url(${settings['background-url']})`, maxWidth: 120, maxHeight: 60 }}
                                className="mr-4 h-screen w-full bg-no-repeat bg-cover"
                              />
                            )}
                            <Input type="file" accept="image/*" onChange={handleImageChange} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Text variant="header">Opacity:</Text>
                          </div>
                          <div>
                            <ToggleGroup type="single" onValueChange={handleOpacityChange} value={settings['background-opacity'].toString()}>
                              {opacityOptions.map((value) => (
                                <ToggleGroupItem key={value} value={value.toString()} aria-label={`Opacity ${value * 100}%`}>
                                  {Math.round(value * 100)}%
                                </ToggleGroupItem>
                              ))}
                            </ToggleGroup>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Text variant="header">Font Size:</Text>
                            <Text>Select the font size for the interface.</Text>
                          </div>
                          <div>
                            <ToggleGroup type="single" value={settings['font-size'].toString()} onValueChange={handleFontSizeChange}>
                              {fontSizeOptions.map((size) => (
                                <ToggleGroupItem key={size} value={size.toString()} aria-label={`Font size ${size}px`}>
                                  {size}px
                                </ToggleGroupItem>
                              ))}
                            </ToggleGroup>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Text variant="header">Font Family:</Text>
                            <Text>Select the font family for the interface.</Text>
                          </div>
                          <div>
                            <ToggleGroup className="flex flex-wrap" type="single" value={settings['font-name']} onValueChange={handleFontChange}>
                              {fontOptions.map((font) => (
                                <ToggleGroupItem key={font.value} value={font.value} aria-label={font.label}>
                                  {font.label}
                                </ToggleGroupItem>
                              ))}
                            </ToggleGroup>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="timers">
                    <AccordionTrigger>
                      <div className="flex"><FiClock className="icon mr-4" /> <Text variant="header">Timers</Text></div>
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
