'use client';

import { useState } from 'react';
import { useSettings } from "@/components/Settings/context";
import { Input } from '@/components/ui/input';
import { TypographySmall } from "@/components/ui/typeography";
import { Text } from "@/components/ui/text";

export const Background = () => {

  const { settings, setSetting } = useSettings();

  const [backgroundImage, setBackgroundImage] = useState(() => {
    const savedImage = settings['background-url'];
    return savedImage ? savedImage : '';
  });

  const [opacity, setOpacity] = useState(() => {
    const savedOpacity = settings['background-opacity'];
    return savedOpacity ? savedOpacity : 0.5;
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setSetting('background-url', base64String);
        setBackgroundImage(base64String as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className='flex items-center p-4 pl-0'>
        {backgroundImage && (<div style={{ backgroundImage: `url(${backgroundImage})`, maxWidth: 120, maxHeight: 60 }} className="mr-4 h-screen w-full bg-no-repeat bg-cover rounded-md" />)}
        <Input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <Text variant="subtitle">Background Opacity: <pre className='inline text-midnight-500 dark:text-midnight-500'>{Math.round(opacity * 100)}%</pre></Text>
        <Input type='range' value={opacity} min={0} max={1} step={0.01} onChange={(e) => { setSetting('background-opacity', e.target.value); setOpacity(e.target.value); }} />
      </div>
    </>
  );
};
