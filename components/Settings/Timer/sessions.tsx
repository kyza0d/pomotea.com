import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '@/components/Settings/context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Session = {
  type: string;
  duration: number;
};

const Sessions: React.FC = () => {
  const { settings, setSetting } = useSettings();
  const [sessions, setSessions] = useState<Session[]>(settings.sessions || []);
  const originalSessions = useRef<number[]>(settings.sessions.map(session => session.duration));

  useEffect(() => {
    originalSessions.current = sessions.map(session => session.duration);
  }, [sessions]);

  const handleAddSession = () => {
    const newSession = { type: 'Working', duration: 0.1 };
    setSessions(prevSessions => {
      const updatedSessions = [...prevSessions, newSession];
      setSetting('sessions', updatedSessions);
      return updatedSessions;
    });
  };

  const handleRemoveSession = (index: number) => {
    setSessions(prevSessions => {
      const updatedSessions = prevSessions.filter((_, i) => i !== index);
      setSetting('sessions', updatedSessions);
      return updatedSessions;
    });
  };

  const handleChangeSession = (index: number, field: string, value: any) => {
    setSessions(prevSessions => {
      const updatedSessions = prevSessions.map((session, i) => (
        i === index ? { ...session, [field]: field === 'duration' ? Number(value) : value } : session
      ));
      setSetting('sessions', updatedSessions);
      return updatedSessions;
    });
  };

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
              onChange={(e) => {
                const value = Number(e.target.value);
                handleChangeSession(index, 'duration', value);
              }}
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
