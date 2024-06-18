import * as React from "react";

import { useEffect, useRef } from "react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";

import { useSettings } from "@/components/Settings/context";

import Sessions from "./sessions";
import Appearance from "./appearance";
import Notifications from "./notifications";
import Colors from "./colors";

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

  const handleReset = () => {
    console.log("handleReset");

    // saveSettings();
    // toggleSettings();
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
          className="w-[85vw] md:w-[95vw] bg-theme-base-darker rounded-md border border-theme-border overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-auto">
            <Accordion type="multiple" className="w-full">
              <Sessions />
              <Appearance />
              <Colors />
              <Notifications />
            </Accordion>
          </div>
          <div className="border-t -mt-[1px] border-t-theme-border flex bg-theme-base dark:bg-midnight-800 p-4">
            <Button className="mr-2" variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button className="ml-auto" variant="outline" onClick={handleReset}>Reset to Defaults</Button>
          </div>
        </div>
      </div>
    </>
  );
};
