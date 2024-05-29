import React, { useState } from 'react';
import { useSettings } from '@/components/Settings/context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';

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

  return (
    <div className="space-y-4">
      {sessions.map((session, index) => (
        <Card key={index} className="p-4 space-y-4">
          <div className="space-y-2">
            <Text variant="subtitle">Session Type:</Text>
            <Input
              value={session.type}
              onChange={(e) => handleChangeSession(index, 'type', e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <Text variant="subtitle">Duration (minutes):</Text>
            <Input
              type="number"
              value={session.duration}
              onChange={(e) => handleChangeSession(index, 'duration', e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <Button variant="secondary" onClick={() => handleRemoveSession(index)} className="w-full">
            Remove
          </Button>
        </Card>
      ))}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Custom Type"
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Duration (minutes)"
            value={customDuration}
            onChange={(e) => setCustomDuration(e.target.value ? Number(e.target.value) : '')}
            className="border rounded p-2 w-full"
          />
        </div>
        <Button variant="default" onClick={handleAddSession} className="w-full">
          Add Custom Session
        </Button>
      </div>
    </div>
  );
};

export default Sessions;
