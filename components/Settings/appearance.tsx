import * as React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/components/Settings/context";
import { Text } from "@/components/ui/text";
import { FiX } from "react-icons/fi";
import { fontOptions, FontOptionKey } from "@/app/fonts";

import {
  FaAdjust,
  FaFont,
  FaImage,
  FaPaintBrush,
  FaSearch,
} from "react-icons/fa";

import { Slider } from "../ui/slider";

const Appearance = () => {
  const { settings, pendingSettings, updateSetting } = useSettings();

  // Handle background image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateSetting('background-url', reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleOpacityChange = (value: number) => updateSetting('background-opacity', value);
  const handleBlurChange = (value: number) => updateSetting('background-blur', value);
  const handleFontSizeChange = (value: number) => updateSetting('font-size', value);
  const handleFontChange = (value: string) => updateSetting('font-name', value);

  return (
    <AccordionItem value="appearance">
      <AccordionTrigger >
        <div className="flex"><FaPaintBrush className="icon-sm mr-4" /> <Text variant="header">Appearance</Text></div>
      </AccordionTrigger>
      <AccordionContent className="pt-8">
        <div className="space-y-10">

          {/* Background Image */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <FaImage size={16} className="mr-4" />  <Text variant="header">Background:</Text>
            </div>
            <div className="w-fit flex rounded-lg space-y-4">
              {pendingSettings['background-url'] && (
                <div className="p-5 relative">
                  <div
                    style={{ backgroundImage: `url(${pendingSettings['background-url']})` }}
                    className="h-28 w-36 bg-no-repeat bg-cover rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 left-2 rounded-lg bg-theme-base text-theme-text"
                    onClick={() => updateSetting('background-url', '')}
                  >
                    <FiX />
                  </Button>
                </div>
              )}
              <div className="flex flex-col space-y-2">
                {!pendingSettings['background-url'] &&
                  <Input
                    type="file"
                    className="w-full"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                }
              </div>
            </div>
          </div>

          {/* Background Filters */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <FaAdjust size={16} className="mr-4" />
              <Text variant="header">Filters:</Text>
            </div>

            <div className="flex gap-2">
              <Text variant="subtitle" className="mr-2 w-32">Opacity</Text>
              <Text className="mr-2 w-12">{pendingSettings['background-opacity']}</Text>
              <Slider
                className="w-full"
                value={[pendingSettings['background-opacity']]}
                onValueChange={([value]) => handleOpacityChange(value)}
                min={0.02}
                max={1.0}
                step={0.1}
              />
            </div>

            <div className="flex gap-2">
              <Text variant="subtitle" className="mr-2 w-32">Blur</Text>
              <Text className="mr-2 w-12">{pendingSettings['background-blur']}</Text>
              <Slider
                className="w-full"
                defaultValue={[pendingSettings['background-blur']]}
                onValueChange={([value]) => handleBlurChange(value)}
                min={0}
                max={5}
                step={0.1}
              />
            </div>
          </div>

          {/* Font Family */}
          <div>
            <div className="flex items-center">
              <FaFont size={16} className="mr-4" />
              <Text variant="header">Font Family:</Text>
            </div>

            <div className='grid grid-cols-[1fr,1fr,1fr] md:grid-cols-[1fr,1fr] gap-4 my-6 mb-8'>
              {fontOptions.map(font => (
                <Button
                  key={font.value}
                  aria-label={font.name}
                  style={{ fontFamily: font.fontFamily }}
                  className={`truncate ${pendingSettings['font-name'] === font.value ? 'bg-theme-accent text-theme-base' : 'text-theme-text'}`}
                  variant="outline"
                  onClick={() => handleFontChange(font.value as FontOptionKey)}
                >
                  {font.name}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <FaSearch size={16} className="mr-4" />
                <Text variant="header">Font Size:</Text>
              </div>
              <div className="flex gap-2">
                <Text variant="subtitle">{pendingSettings['font-size']}px</Text>
                <Slider
                  className="w-full"
                  value={[pendingSettings['font-size']]}
                  onValueChange={([value]) => handleFontSizeChange(value)}
                  min={14}
                  max={18}
                  step={1}
                />
              </div>
            </div>
          </div>

        </div>
      </AccordionContent>
    </AccordionItem >
  );
};

export default Appearance;
