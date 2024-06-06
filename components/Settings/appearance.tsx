import * as React from "react";
import { FiEye } from "react-icons/fi";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/components/Settings/context";
import { Text } from "@/components/ui/text";

const Appearance = () => {
  const { pendingSettings, setPendingSetting } = useSettings();

  // Update theme setting
  const handleThemeChange = (value: string) => setPendingSetting('theme', value);

  // Handle background image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPendingSetting('background-url', reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Update background opacity
  const handleOpacityChange = (value: string) => setPendingSetting('background-opacity', value);

  // Update font size
  const handleFontSizeChange = (value: string) => setPendingSetting('font-size', parseInt(value, 10));

  // Update font family
  const handleFontChange = (value: string) => setPendingSetting('font-name', value);

  const opacityOptions = [0.1, 0.25, 0.5, 0.75, 1.0];
  const fontSizeOptions = [12, 14, 16, 18, 20, 24];
  const fontOptions = [
    { value: "sans-serif", label: 'Sans-serif' },
    { value: "monospace", label: 'Monospace' },
    { value: "inter", label: 'Inter' },
    { value: "jetbrains-mono", label: 'JetBrains Mono' },
    { value: "manrope", label: 'Manrope' },
    { value: "roboto-mono", label: 'Roboto Mono' },
  ];

  return (
    <AccordionItem value="appearance">
      <AccordionTrigger>
        <div className="flex"><FiEye className="icon mr-4" /> <Text variant="header">Appearance</Text></div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text variant="header">Theme:</Text>
              <Text>Select the theme for the interface.</Text>
            </div>
            <div className="flex flex-wrap gap-2">
              {['light', 'dark', 'system'].map(theme => (
                <Button
                  key={theme}
                  value={theme}
                  aria-label={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`}
                  onClick={() => handleThemeChange(theme)}
                  variant={pendingSettings.theme === theme ? 'primary' : 'secondary'}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text variant="header">Background:</Text>
              <Text>This is the background image currently being used in the interface.</Text>
            </div>
            <div className="flex">
              {pendingSettings['background-url'] && (
                <div
                  style={{ backgroundImage: `url(${pendingSettings['background-url']})`, maxWidth: 120, maxHeight: 60 }}
                  className="mr-4 h-screen w-full bg-no-repeat bg-cover"
                />
              )}
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text variant="header">Opacity:</Text>
            </div>
            <div className="flex flex-wrap gap-2">
              {opacityOptions.map(value => (
                <Button
                  key={value}
                  value={value.toString()}
                  aria-label={`Opacity ${Math.round(value * 100)}%`}
                  onClick={() => handleOpacityChange(value.toString())}
                  variant={pendingSettings['background-opacity'] === value.toString() ? 'primary' : 'secondary'}
                >
                  {Math.round(value * 100)}%
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text variant="header">Font Size:</Text>
              <Text>Select the font size for the interface.</Text>
            </div>
            <div className="flex flex-wrap gap-2">
              {fontSizeOptions.map(size => (
                <Button
                  key={size}
                  aria-label={`Font size ${size}px`}
                  variant={pendingSettings['font-size'] === size ? 'primary' : 'secondary'}
                  onClick={() => handleFontSizeChange(size.toString())}
                >
                  {size}px
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text variant="header">Font Family:</Text>
              <Text>Select the font family for the interface.</Text>
            </div>
            <div className="flex flex-wrap gap-2">
              {fontOptions.map(font => (
                <Button
                  key={font.value}
                  aria-label={font.label}
                  variant={pendingSettings['font-name'] === font.value ? 'primary' : 'secondary'}
                  onClick={() => handleFontChange(font.value)}
                >
                  {font.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Appearance;
