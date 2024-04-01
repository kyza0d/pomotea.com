"use client"

import * as React from "react";
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

export function DurationMode() {
  const { settings, setSetting } = useSettings();
  const selectedDurationMode = settings['duration-mode'];

  const options = ['entireLength', 'currentTask'];

  const handleChange = (value: string) => {
    setSetting('duration-mode', value);
  };

  return (
    <Select onValueChange={handleChange} value={selectedDurationMode.toString()}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a duration mode">
          {selectedDurationMode ? `${selectedDurationMode}` : 'Select a duration mode'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Font Size</SelectLabel>
          {options.map((type) => (
            <SelectItem key={type} value={type.toString()}>
              {type}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
