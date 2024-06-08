"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { FiSettings } from "react-icons/fi";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { useSettings } from "@/components/Settings/context";
import Sessions from "./sessions";
import Appearance from "./appearance";
import Notifications from "./notifications";

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pendingSettings, saveSettings } = useSettings();
  const backdropRef = useRef(null);
  const { setTheme } = useTheme();

  // Toggle settings modal visibility
  const toggleSettings = () => setIsOpen(prevIsOpen => !prevIsOpen);

  // Handle backdrop clicks to close modal
  const handleBackdropClick = (event: any) => {
    event.target === backdropRef.current && toggleSettings();
  };

  // Attach and detach event listener for backdrop clicks
  useEffect(() => {
    document.addEventListener("click", handleBackdropClick);
    return () => document.removeEventListener("click", handleBackdropClick);
  }, []);

  // Save changes and apply theme
  const handleSaveChanges = async () => {
    saveSettings();
    setTheme(pendingSettings.theme);
    toggleSettings();
  };

  return (
    <>
      {/* Settings button */}
      <Button variant="ghost" size="icon" onClick={toggleSettings}>
        <FiSettings className="icon" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="fixed inset-0 opacity-70 z-40 bg-black"
            onClick={handleBackdropClick}
          ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-midnight-100 dark:bg-midnight-900 w-[85vw] h-[80vh] md:w-[95vw] md:h-[95vh] rounded-md border border-input overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-auto">
            <Accordion type="multiple" className="w-full px-4" defaultValue={["sessions", "appearance", "notifications"]}>
                  <Appearance />
                  <Sessions />
              <Notifications />
                </Accordion>
              </div>
          <div className="bg-midnight-200 dark:bg-midnight-800 p-4 space-x-6">
            <Button variant="outline" onClick={handleSaveChanges}>Save Changes</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
};
