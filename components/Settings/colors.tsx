import React from 'react';
import { FaPalette } from 'react-icons/fa';
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";
import ColorPicker from './ColorPicker';
import { Button } from '../ui/button';
import { useSettings } from './context';

type ColorScheme = {
  base: string;
  'base-darker': string;
  accent: string;
  header: string;
  subtitle: string;
  foreground: string;
  border: string;
};

type ThemeSettings = {
  [key: string]: ColorScheme; // This allows additional color schemes
};

const themes: ThemeSettings = {
  "Midnight": {
    base: '#0F172A',
    'base-darker': '#090e19',
    accent: '#3B82F6',
    header: '#e0ebf4',
    subtitle: '#a0b7e5',
    foreground: '#abc3f4',
    border: '#2e3a56',
  },
  "Ivy": {
    base: '#181e1d',
    'base-darker': '#0b0f0e',
    accent: '#bcc661',
    header: '#e4e8e7',
    subtitle: '#a6b1b0',
    foreground: '#ccd2d1',
    border: '#2b3534',
  },
  "Lush": {
    base: '#3a2b36',
    'base-darker': '#2d212b',
    accent: '#ff007b',
    header: '#e7dce3',
    subtitle: '#a898a6',
    foreground: '#cdbfc9',
    border: '#4b4050',
  },
  "Ocean": {
    base: '#2e3b4a',
    'base-darker': '#232c38',
    accent: '#007bff',
    header: '#dce0e6',
    subtitle: '#98a1ad',
    foreground: '#bfc6d0',
    border: '#4b5a6a',
  },
  "Slate": {
    base: '#20232a',
    'base-darker': '#14161a',
    accent: '#6699ff',
    header: '#d8dade',
    subtitle: '#9ba0a9',
    foreground: '#bcc1c9',
    border: '#323640',
  },
  "Gruvbox": {
    base: '#282828',
    'base-darker': '#1d1d1d',
    accent: '#fabd2f',
    header: '#e0e0e0',
    subtitle: '#a3a3a3',
    foreground: '#cccccc',
    border: '#464646',
  },
  "Mint": {
    base: '#e0e4cc',
    'base-darker': '#f2f7dc',
    accent: '#8ec07c',
    header: '#2a3c19',
    subtitle: '#6a804a',
    foreground: '#455f30',
    border: '#c8ccbf',
  },
  "Ice Storm": {
    base: '#e4e8e7',
    'base-darker': '#f2f5f4',
    accent: '#00b7c3',
    header: '#0a1d1b',
    subtitle: '#59a299',
    foreground: '#14433f',
    border: '#ccd2d1',
  },
  "Fall": {
    base: '#262322',
    'base-darker': '#1C1A19',
    accent: '#FFA500',
    header: '#EDEBE8',
    subtitle: '#CDC8C5',
    foreground: '#A39F9C',
    border: '#4A4745',
  },
};

const Colors = () => {
  const { updateThemeSetting } = useSettings();

  const handleThemeChange = (theme: string) => {
    const selectedTheme = themes[theme];
    updateThemeSetting(theme, selectedTheme);
  };

  return (
    <AccordionItem value="colors">
      <AccordionTrigger>
        <div className="flex items-center space-x-2">
          <FaPalette className="icon-sm mr-2" />
          <Text variant="header">Colors</Text>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-8">
        <Text size="lg" variant="subtitle">Themes</Text>
        <div className='flex flex-wrap w-[60%] gap-4 my-6 mb-8'>
          {
            Object.keys(themes).map(theme => (
              <Button
                key={theme}
                variant="outline"
                onClick={() => handleThemeChange(theme)}
                style={{
                  color: themes[theme].foreground,
                  backgroundColor: themes[theme].base,
                }}
              >
                {theme}
              </Button>
            ))
          }
        </div>

        <Text size="lg" variant="subtitle">Background Colors</Text>
        <div className="grid grid-cols-2 gap-4 my-6">
          <ColorPicker variableName="base" label="Background" />
          <ColorPicker variableName="base-darker" label="Background - Darker" />
          <ColorPicker variableName="border" label="Borders" />
          <ColorPicker variableName="accent" label="Accent" />
        </div>
        <Text className='mb-4' size="lg" variant="subtitle">Text Colors</Text>
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker variableName="header" label="Headers" />
          <ColorPicker variableName="subtitle" label="Subtitles" />
          <ColorPicker variableName="foreground" label="Foreground" />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Colors;
