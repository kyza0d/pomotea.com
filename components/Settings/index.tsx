import * as React from "react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";

import { useSettings } from "@/components/Settings/context";

import Sessions from "./sessions";
import Appearance from "./appearance";
import Notifications from "./notifications";
import Colors from "./colors";

export const Settings = ({ toggleSettings }: { toggleSettings: () => void }) => {
  const { pendingSettings, saveSettings } = useSettings();
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
  };

  return (
    <>
      <div
        className="fixed inset-0 opacity-60 z-40 bg-black cursor-pointer"
        onClick={toggleSettings}
      ></div>

      <div className="py-12 fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="w-[70vw] md:w-[40vw] h-full  bg-theme-base-darker rounded-md border border-theme-border overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-auto">
            <Accordion type="multiple" className="w-full">
              {/* <Account /> */}
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
