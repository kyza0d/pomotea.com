"use client";

import { useSettings } from "@/components/Settings/context";

export default function Theme() {
  const { settings } = useSettings();
  const fontSize = settings["font-size"];

  return <>
    <style>{`body { font-size: ${fontSize}px; font-family: sans-serif; }`}</style>
    <div className="w-full h-full fixed top-0 -z-10">
      {settings["background-url"] && <img className="w-full h-full object-cover opacity-20 relative" src={settings["background-url"]} />}
    </div>
  </>;
}
