"use client"

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <Select onValueChange={handleFontSizeChange} value={selectedFontSize.toString()}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a font size">
          {selectedFontSize ? `${selectedFontSize}px` : 'Select a font size'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Font Size</SelectLabel>
          {fontSizeOptions.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}px
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function FontFamily() {
  const { settings, setSetting } = useSettings();

  const selectedFont = settings['font-name'];

  const fontNameMap: Record<string, string> = {
    "sans-serif": 'System Sans-serif',
    "inter": 'Inter',
    "monospace": 'System Monospace',
    'jetbrains-mono': 'JetBrains Mono',
  };

  const handleFontChange = (value: string) => {
    setSetting('font-name', value);
    document.body.className = `font-${value}`;
  };

  return (
    <Select onValueChange={handleFontChange} value={selectedFont}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a font">
          {selectedFont ? fontNameMap[selectedFont] : 'Select a font'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sans-serif</SelectLabel>
          <SelectItem value="sans">System</SelectItem>
          <SelectItem value="[Inter]">Inter</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectSeparator />
          <SelectLabel>Monospace</SelectLabel>
          <SelectItem value="mono">System</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
