'use client';

import { useState } from 'react';
import { useSettings } from "@/components/Settings/context";
import { Input } from '../ui/input';

export const Background = () => {

  const { settings, setSetting } = useSettings();

  const [backgroundImage, setBackgroundImage] = useState(() => {
    const savedImage = settings['background-url'];
    return savedImage ? savedImage : '';
  });

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
    <div className='max-w-xl bg-background flex items-center space-x-4 p-4 rounded-md border border-input'>
      {backgroundImage && (<div style={{ backgroundImage: `url(${backgroundImage})`, maxWidth: 120, maxHeight: 60 }} className="h-screen w-full bg-no-repeat bg-cover" />)}
      <Input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};
