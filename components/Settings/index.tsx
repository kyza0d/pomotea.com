import * as React from "react";

import { useEffect, useRef } from "react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";

import { useSettings } from "@/components/Settings/context";

import Sessions from "./sessions";
import Appearance from "./appearance";
import Notifications from "./notifications";

import { useMediaQuery } from 'react-responsive';

export const Settings = ({ toggleSettings }: { toggleSettings: () => void }) => {
  const { pendingSettings, saveSettings } = useSettings();
  const backdropRef = useRef(null);
  const { setTheme } = useTheme();

  const handleSaveChanges = async () => {
    saveSettings();
    setTheme(pendingSettings.theme);
    toggleSettings();
  };

  const handleCancel = () => {
    toggleSettings();
  };

  const [screenHeight, setScreenHeight] = React.useState(window.innerHeight - 24);

  const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // below md breakpoint

  // create a listener for window resize
  useEffect(() => {
    const handleResize = () => {
      if (isSmallScreen) {
        setScreenHeight(window.innerHeight - 24);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);


  return (
    <>
      <div
        ref={backdropRef}
        className="fixed inset-0 opacity-60 z-40 bg-black cursor-pointer"
        onClick={toggleSettings}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          style={{ height: screenHeight }}
          className="w-[85vw] md:w-[95vw] bg-midnight-100 dark:bg-midnight-900 rounded-md border border-input overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-auto">
            <Accordion type="multiple" className="w-full px-8" defaultValue={["sessions", "appearance", "notifications"]}>
              <Sessions />
              <Appearance />
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
