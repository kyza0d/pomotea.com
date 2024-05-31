"use client";

import { useSettings } from "@/components/Settings/context";

import "@/app/fonts.css";

export default function Theme({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();

  return (
    <div className={`font-${settings["font-name"]}`}>
      <div className="w-full h-full fixed top-0 -z-10">
        {settings["background-url"] && (
          <img
            style={{
              opacity: settings["background-opacity"],
            }}
            className="w-full h-full object-cover opacity-50 relative"
            src={settings["background-url"]}
          />
        )}
      </div>
      {children}
    </div>
  );
}
