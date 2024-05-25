import React, { useState, useEffect } from 'react';
import { useSettings } from '@/components/Settings/context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Sessions: React.FC = () => {
  const { settings, setSetting } = useSettings();
  const [sessions, setSessions] = useState(settings.sessions || []);

  const handleAddSession = () => {
    setSessions([...sessions, { type: 'Working', duration: 25 }]);
  };

  const handleRemoveSession = (index: number) => {
    const updatedSessions = sessions.filter((_, i) => i !== index);
    setSessions(updatedSessions);
  };

  const handleChangeSession = (index: number, field: string, value: any) => {
    const updatedSessions = sessions.map((session, i) => (
      i === index ? { ...session, [field]: value } : session
    ));
    setSessions(updatedSessions);
  };

  useEffect(() => {
    setSetting('sessions', sessions);
  }, [sessions, setSetting]);

  return (
    <div>
      {sessions.map((session, index) => (
        <Card key={index} className="mb-4 p-4 flex flex-col space-y-4">
          <div className="flex space-x-4">
            <Text variant="subtitle">Session Type:</Text>
            <Select
              onValueChange={(value) => handleChangeSession(index, 'type', value)}
              value={session.type}
            >
              <SelectTrigger>
                <SelectValue>{session.type}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Working">Working</SelectItem>
                <SelectItem value="Break">Break</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-4">
            <Text variant="subtitle">Duration (minutes):</Text>
            <Input
              type="number"
              value={session.duration}
              onChange={(e) => handleChangeSession(index, 'duration', e.target.value)}
              className="border rounded p-2 w-16"
            />
          </div>
          <Button variant="secondary" onClick={() => handleRemoveSession(index)}>Remove</Button>
        </Card>
      ))}
      <Button variant="default" onClick={handleAddSession}>Add Session</Button>
    </div>
  );
};

export default Sessions;

