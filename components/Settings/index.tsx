import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { useSettings } from "@/components/Settings/context";
import Sessions from "./sessions";
import Appearance from "./appearance";
import Notifications from "./notifications";
import Colors from "./colors";
import { useToast } from "@/components/ui/use-toast";

export const Settings = ({ toggleSettings }: { toggleSettings: () => void }) => {
  const { pendingSettings, saveSettings, resetSettings } = useSettings();
  const { setTheme } = useTheme();
  const { toast } = useToast();

  const handleSaveChanges = async () => {
    await saveSettings();
    setTheme(pendingSettings.theme);
    toggleSettings();
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully saved.",
      duration: 5000,
    });
  };

  const handleCancel = () => {
    toggleSettings();
  };

  const handleReset = async () => {
    await resetSettings();
    toggleSettings();
    setTheme('system'); // or whatever your default theme is
    toast({
      title: "Settings reset",
      description: "All settings have been reset to their default values.",
      duration: 5000,
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 opacity-60 z-40 bg-black cursor-pointer"
        onClick={toggleSettings}
      ></div>

      <div className="py-12 fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-[70vw] md:w-[90vw] h-full bg-theme-base-darker rounded-md border border-theme-border overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-auto">
            <Accordion type="multiple" className="w-full">
              <Sessions />
              <Appearance />
              <Colors />
              <Notifications />
            </Accordion>
          </div>
          <div className="border-t -mt-[1px] border-t-theme-border flex bg-theme-base dark:bg-midnight-800 p-4">
            <Button className="mr-2 md:hidden" variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            <Button className="mr-2 hidden md:flex" variant="primary" onClick={handleSaveChanges}>Save</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button className="ml-auto md:hidden" variant="outline" onClick={handleReset}>Reset to Defaults</Button>
            <Button className="ml-auto hidden md:flex" variant="outline" onClick={handleReset}>Reset</Button>
          </div>
        </div>
      </div>
    </>
  );
};
