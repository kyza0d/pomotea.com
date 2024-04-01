"use client"

import * as React from "react";
import "@/app/fonts.css"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/components/Settings/context";

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
          <SelectItem value="inter">Inter</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Monospace</SelectLabel>
          <SelectItem value="monospace">System</SelectItem>
          <SelectItem value="jetbrains-mono">JetBrains Mono</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
