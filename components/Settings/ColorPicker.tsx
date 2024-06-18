import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { useSettings } from "./context";
import { Text } from "@/components/ui/text";

interface Colors {
  accent: string;
  base: string;
  'base-darker': string;
  border: string;
  foreground: string;
  header: string;
  subtitle: string;
}

const isValidHex = (color: string) => {
  const hex = color.startsWith('#') ? color.slice(1) : color;
  return /^[0-9A-Fa-f]{6}$/.test(hex);
};

const formatColor = (color: string) => {
  if (!color.startsWith("#")) {
    color = `#${color}`;
  }
  return color.toUpperCase();
};

const ColorPicker = ({ variableName, label }: { variableName: keyof Colors, label: string }) => {
  const { settings, updateSetting } = useSettings();
  const [color, setColor] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const colorValue = document.documentElement.style.getPropertyValue(`--${variableName}`).trim() || settings.colors[variableName];
    setColor(colorValue);
    if (inputRef.current) {
      inputRef.current.value = colorValue;
    }
  }, [settings.colors, variableName]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
  };

  const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
    updateSetting(`colors.${variableName}`, newColor);
    document.documentElement.style.setProperty(`--${variableName}`, newColor);
  };

  const applyColorChange = () => {
    let currentColor = color;
    if (isValidHex(currentColor)) {
      currentColor = formatColor(currentColor);
      document.documentElement.style.setProperty(`--${variableName}`, currentColor);
      if (inputRef.current) {
        inputRef.current.value = currentColor;
      }
      updateSetting(`colors.${variableName}`, currentColor);
    } else {
      if (inputRef.current) {
        inputRef.current.value = color;
      }
    }
  };

  const handleBlur = () => {
    applyColorChange();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applyColorChange();
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleColorPreviewClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Text size="sm" variant="label">{label}</Text>
      <div className="grid grid-cols-[auto,1fr] gap-6">
        <div className="flex-grow items-center flex">
          <Input
            type="text"
            ref={inputRef}
            value={color}
            onChange={handleColorChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <div
            className="w-10 h-10 ml-4 rounded-md cursor-pointer border border-theme-border"
            style={{ backgroundColor: color }}
            onClick={handleColorPreviewClick}
          />
          <div>
            <input
              type="color"
              ref={colorInputRef}
              value={color}
              onChange={handleColorPickerChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
