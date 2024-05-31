import React, { useState } from 'react';
import { useSettings } from '@/components/Settings/context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'react-feather';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Sessions: React.FC = () => {
  const { settings, setSetting } = useSettings();
  const [sessions, setSessions] = useState(settings.sessions || []);
  const [customType, setCustomType] = useState('');
  const [customDuration, setCustomDuration] = useState<number | ''>('');

  const handleAddSession = () => {
    if (customType && customDuration) {
      const newSession = { type: customType, duration: Number(customDuration) };
      const updatedSessions = [...sessions, newSession];
      setSessions(updatedSessions);
      setSetting('sessions', updatedSessions);
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
    setSetting('sessions', updatedSessions);
    console.log(`Session at index ${index} removed`);
  };

  const handleChangeSession = (index: number, field: string, value: any) => {
    console.log(`Changing session at index ${index}, field: ${field}, value: ${value}`);
    const updatedSessions = sessions.map((session, i) => (
      i === index ? { ...session, [field]: field === 'duration' ? Number(value) : value } : session
    ));
    setSessions(updatedSessions);
    setSetting('sessions', updatedSessions);
  };

  const handleDurationChange = (index: number, value: string) => {
    handleChangeSession(index, 'duration', Number(value));
  };

  return (
    <div className="space-y-6 py-8">
      <div className="grid grid-cols-[10%,60%,30%] items-center">
        <div></div> {/* Empty div to maintain grid structure */}
        <div className="font-bold">Session Type</div>
        <div className="font-bold">Session Length</div>
      </div>
      {sessions.map((session, index) => (
        <Card key={index} className="grid grid-cols-[10%,60%,30%] items-center">
          <Button variant="secondary" onClick={() => handleRemoveSession(index)} className="bg-slate-800 text-white flex justify-center">
            <X size={16} />
          </Button>
          <Input
            value={session.type}
            onChange={(e) => handleChangeSession(index, 'type', e.target.value)}
            placeholder="Session Type"
            className="border rounded"
          />
          <ToggleGroup
            type="single"
            value={session.duration?.toString()}
            onValueChange={(value) => handleDurationChange(index, value)}
            className="flex justify-around"
          >
            <ToggleGroupItem value="5" aria-label="5 minutes">
              5
            </ToggleGroupItem>
            <ToggleGroupItem value="15" aria-label="15 minutes">
              15
            </ToggleGroupItem>
            <ToggleGroupItem value="30" aria-label="30 minutes">
              30
            </ToggleGroupItem>
          </ToggleGroup>
        </Card>
      ))}
      <Card className="grid grid-cols-[10%,60%,30%] items-center">
        <Button variant="default" onClick={handleAddSession} className="bg-blue-500 hover:bg-blue-400 text-white flex justify-center">
          <Plus size={16} />
        </Button>
        <Input
          placeholder="Custom Type"
          value={customType}
          onChange={(e) => setCustomType(e.target.value)}
          className="border rounded p-1"
        />
        <ToggleGroup
          type="single"
          value={customDuration?.toString()}
          onValueChange={(value) => setCustomDuration(Number(value))}
          className="flex justify-around"
        >
          <ToggleGroupItem value="5" aria-label="5 minutes">
            5
          </ToggleGroupItem>
          <ToggleGroupItem value="15" aria-label="15 minutes">
            15
          </ToggleGroupItem>
          <ToggleGroupItem value="30" aria-label="30 minutes">
            30
          </ToggleGroupItem>
        </ToggleGroup>
      </Card>
    </div>
  );
};

export default Sessions;
