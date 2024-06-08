import React, { useState } from 'react';
import { useSettings } from '@/components/Settings/context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'react-feather';
import { Text } from "@/components/ui/text"
import { Slider } from '@/components/ui/slider';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FiClock } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';

const Sessions: React.FC = () => {
  const { pendingSettings, setPendingSetting } = useSettings();
  const [sessions, setSessions] = useState(pendingSettings.sessions || []);
  const [customType, setCustomType] = useState('');
  const [customDuration, setCustomDuration] = useState<number | ''>(25);
  const [customTitle, setCustomTitle] = useState('');

  const handleAddSession = () => {
    if (customType && customDuration) {
      const newSession = { type: customType, title: customTitle, duration: Number(customDuration) };
      const updatedSessions = [...sessions, newSession];
      setSessions(updatedSessions);
      setPendingSetting('sessions', updatedSessions);
      setCustomType('');
      setCustomDuration('');
      console.log('New session added:', newSession);
    } else {
      console.log('Please enter a valid session type and duration.');
    }
  };

  const handleRemoveSession = (index: number) => {
    const updatedSessions = sessions.filter((_, i) => i !== index);
    setSessions(updatedSessions);
    setPendingSetting('sessions', updatedSessions);
    console.log(`Session at index ${index} removed`);
  };

  const handleChangeSession = (index: number, field: string, value: any) => {
    console.log(`Changing session at index ${index}, field: ${field}, value: ${value}`);
    const updatedSessions = sessions.map((session, i) => (
      i === index ? { ...session, [field]: field === 'duration' ? Number(value) : value } : session
    ));
    setSessions(updatedSessions);
    setPendingSetting('sessions', updatedSessions);
  };

  const isLargeScreen = useMediaQuery({ minWidth: 768 }); // md breakpoint and above
  const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // below md breakpoint

  return (
    <AccordionItem value="sessions">
      <AccordionTrigger>
        <div className="flex items-center"><FiClock className="icon-sm mr-4" /> <Text variant="header">Sessions</Text></div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-6 py-8">
          {isLargeScreen && (
            <>
              <div className="grid grid-cols-[20%,40%,33%,7%] items-center mb-4">
                <div className="font-bold text-gray-300">Type</div>
                <div className="font-bold text-gray-300">Title</div>
                <div className="font-bold text-gray-300">Length</div>
                <div></div> {/* Empty div to maintain grid structure */}
              </div>
              {sessions.map((session, index) => (
                <Card key={index} className="grid grid-cols-[20%,40%,33%,7%] rounded-lg p-4 mb-4">
                  <div className="flex space-x-4">
                    <Button className='flex-1' variant={session.type === 'Break' ? 'primary' : 'secondary'} onClick={() => handleChangeSession(index, 'type', 'Break')}>
                      Break
                    </Button>
                    <Button className="flex-1" variant={session.type === 'Focus' ? 'primary' : 'secondary'} onClick={() => handleChangeSession(index, 'type', 'Focus')}>
                      Focus
                    </Button>
                  </div>
                  <Input
                    value={session.title}
                    onChange={(e) => handleChangeSession(index, 'title', e.target.value)}
                    placeholder="Enter Title"
                    className="border rounded-lg text-white w-full ml-4"
                  />
                  <div className="flex items-center space-x-2 mx-6">
                    <span className="text-gray-300">{session.duration}</span>
                    <Slider
                      value={[session.duration]}
                      onValueChange={(value) => handleChangeSession(index, 'duration', value[0])}
                      min={0.1}
                      max={120}
                      step={5}
                    />
                  </div>
                  <Button variant="secondary" onClick={() => handleRemoveSession(index)} className="text-white flex justify-center items-center p-2 w-10 h-10">
                    <X size={16} />
                  </Button>
                </Card>
              ))}
              <div className="font-bold text-gray-300">Create Session</div>
              <hr className="border-gray-700 mb-4" />
              <Card className="grid grid-cols-[20%,40%,33%,7%] items-center rounded-lg p-4 mb-4 md:space-y-0">
                <div className="flex space-x-4">
                  <Button className="flex-1" variant={customType === 'Break' ? 'primary' : 'secondary'} onClick={() => setCustomType('Break')}>
                    Break
                  </Button>
                  <Button className="flex-1" variant={customType === 'Focus' ? 'primary' : 'secondary'} onClick={() => setCustomType('Focus')}>
                    Focus
                  </Button>
                </div>
                <Input
                  placeholder="Enter Title"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="border rounded-lg text-white w-full ml-4"
                />
                <div className="flex items-center space-x-2 mx-6">
                  <span className="text-gray-300">{customDuration}</span>
                  <Slider
                    value={[Number(customDuration)]}
                    onValueChange={(value) => setCustomDuration(value[0])}
                    min={5}
                    max={120}
                    step={5}
                  />
                </div>
                <Button variant="default" onClick={handleAddSession} className="w-10 h-10 bg-blue-500 text-white flex justify-center items-center p-2">
                  <Plus size={16} />
                </Button>
              </Card>
            </>
          )}
          {isSmallScreen && (
            <>
              {sessions.map((session, index) => (
                <Card key={index} className="flex flex-col space-y-4 rounded-lg p-4 mb-4">
                  <div className="flex space-x-2">
                    <Button className='flex-1' variant={session.type === 'Break' ? 'primary' : 'secondary'} onClick={() => handleChangeSession(index, 'type', 'Break')}>
                      Break
                    </Button>
                    <Button className='flex-1' variant={session.type === 'Focus' ? 'primary' : 'secondary'} onClick={() => handleChangeSession(index, 'type', 'Focus')}>
                      Focus
                    </Button>
                  </div>
                  <div className='flex space-x-2'>
                    <Input
                      value={session.title}
                      onChange={(e) => handleChangeSession(index, 'title', e.target.value)}
                      placeholder="Enter Title"
                      className="border rounded-lg p-2 text-white w-full"
                    />
                    <Button variant="secondary" onClick={() => handleRemoveSession(index)} className="text-white flex justify-center items-center p-2 w-10 h-10">
                      <X size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 w-full">
                    <span className="text-gray-300">{session.duration}</span>
                    <Slider
                      value={[session.duration]}
                      onValueChange={(value) => handleChangeSession(index, 'duration', value[0])}
                      min={0.1}
                      max={120}
                      step={5}
                      className="flex-grow"
                    />
                  </div>
                </Card>
              ))}
              <div className="font-bold text-gray-300">Create Session</div>
              <hr className="border-gray-700 mb-4" />
              <Card className="flex flex-col space-y-4 rounded-lg p-4 mb-4">
                <div className="flex space-x-2">
                  <Button className="flex-1" variant={customType === 'Break' ? 'primary' : 'secondary'} onClick={() => setCustomType('Break')}>
                    Break
                  </Button>
                  <Button variant={customType === 'Focus' ? 'primary' : 'secondary'} onClick={() => setCustomType('Focus')}>
                    Focus
                  </Button>
                </div>
                <div className='flex space-x-2'>
                  <Input
                    placeholder="Enter Title"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="border rounded-lg p-2 text-white w-full"
                  />
                  <Button variant="default" onClick={handleAddSession} className="w-10 h-10 bg-blue-500 text-white flex justify-center items-center p-2">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex items-center space-x-2 w-full">
                  <span className="text-gray-300">{customDuration}</span>
                  <Slider
                    value={[Number(customDuration)]}
                    onValueChange={(value) => setCustomDuration(value[0])}
                    min={5}
                    max={120}
                    step={5}
                    className="flex-grow"
                  />
                </div>
              </Card>
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default Sessions;
