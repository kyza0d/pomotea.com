"use client";

import { useSettings } from "@/components/Settings/context";
import React, { useEffect } from "react";


export default function Theme({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();


  useEffect(() => {
    const baseFontSize = settings['font-size'];
    const fontSizes = {
      '--font-size-sm': `${baseFontSize * 0.8}px`,
      '--font-size-md': `${baseFontSize}px`,
      '--font-size-lg': `${baseFontSize * 1.2}px`,
      '--font-size-xl': `${baseFontSize * 1.4}px`,
      '--font-size-2xl': `${baseFontSize * 2}px`,
    };

    Object.entries(fontSizes).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [settings['font-size']]);

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
