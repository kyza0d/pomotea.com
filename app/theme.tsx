"use client";

import { useSettings } from "@/components/Settings/context";
import React, { useEffect } from "react";
import { fontOptions, FontOptionKey } from '@/app/fonts';

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

    const selectedFont = settings["font-name"] as FontOptionKey;
    const fontOption = fontOptions.find(option => option.value === selectedFont);
    if (fontOption) {
      document.documentElement.style.setProperty('--font-family', fontOption.fontFamily);
    }
  }, [settings]);

  return (
    <>
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
      <main className={`font-${settings["font-name"]} h-screen max-w-3xl mx-auto px-6 pt-4`}>
        {children}
      </main>
    </>
  );
}
