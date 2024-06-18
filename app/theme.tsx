"use client";

import { useSettings } from "@/components/Settings/context";
import React, { useEffect } from "react";

type ColorSettings = {
  base: string;
  'base-darker': string;
  foreground: string;
  border: string;
  accent: string;
  header: string;
  subtitle: string;
};

export default function Theme({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();

  useEffect(() => {
    const baseFontSize = settings['font-size'];
    const fontSizes = {
      '--font-size-sm': `${baseFontSize * 0.9}px`,
      '--font-size-md': `${baseFontSize}px`,
      '--font-size-lg': `${baseFontSize * 1.2}px`,
      '--font-size-xl': `${baseFontSize * 1.4}px`,
      '--font-size-2xl': `${baseFontSize * 2}px`,
    };

    Object.entries(fontSizes).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    const colorSettings: ColorSettings = settings.colors;
    Object.keys(colorSettings).forEach((key) => {
      const cssVar = `--${key}`;
      document.documentElement.style.setProperty(cssVar, colorSettings[key as keyof ColorSettings]);
    });
  }, [settings]);

  return (
    <>
      <div className={`font-${settings["font-name"]}`}>
        <div className="w-full h-full fixed top-0 left-0 -z-10"
          style={{
            background: settings.colors["base-darker"]
          }}
        >
          {
            settings["background-url"] && (
              <img
                style={{
                  opacity: settings["background-opacity"],
                  filter: `blur(${settings["background-blur"] * 5}px)`
                }}
                className="w-full h-full object-cover relative"
                src={settings["background-url"]}
              />
            )
          }
        </div>
        {children}
      </div >
    </>
  );
}
