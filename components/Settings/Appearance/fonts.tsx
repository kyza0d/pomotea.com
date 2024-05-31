"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSettings } from "@/components/Settings/context";

export function FontSize() {
  const { settings, setSetting } = useSettings();
  const selectedFontSize = settings['font-size'];

  const fontSizeOptions = [12, 14, 16, 18, 20, 24];

  const handleFontSizeChange = (value: string) => {
    const size = parseInt(value, 10);
    setSetting('font-size', size);
    document.documentElement.style.setProperty('--font-size', `${size}px`);
  };

  return (
    <ToggleGroup type="single" value={selectedFontSize.toString()} onValueChange={handleFontSizeChange}>
      {fontSizeOptions.map((size) => (
        <ToggleGroupItem key={size} value={size.toString()} aria-label={`Font size ${size}px`}>
          {size}px
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function FontFamily() {
  const { settings, setSetting } = useSettings();

  const selectedFont = settings['font-name'];

  const fontOptions = [
    { value: "sans-serif", label: 'System Sans-serif' },
    { value: "inter", label: 'Inter' },
    { value: "mono", label: 'System Monospace' },
    { value: "jetbrains-mono", label: 'JetBrains Mono' },
    { value: "roboto-mono", label: 'Roboto' },
    { value: "open-sans", label: 'Open Sans' },
    { value: "lato", label: 'Lato' }
  ];

  const handleFontChange = (value: string) => {
    console.log(value);
    setSetting('font-name', value);
    document.body.className = `font-${value}`;
  };

  return (
    <ToggleGroup type="single" value={selectedFont} onValueChange={handleFontChange}>
      {fontOptions.map((font) => (
        <ToggleGroupItem key={font.value} value={font.value} aria-label={font.label} className={`font-${font.value}`}>
          {font.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
