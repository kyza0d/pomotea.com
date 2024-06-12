import React, { useState } from 'react';
import { useSettings } from '@/components/Settings/context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'react-feather';
import { Text } from "@/components/ui/text";
import { Slider } from '@/components/ui/slider';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FiClock } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Sortable, SortableItem, SortableDragHandle } from '@/components/ui/sortable'; // Adjust the import path as necessary
import { arrayMove } from '@dnd-kit/sortable';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';

const schema = z.object({
  sessions: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      title: z.string(),
      duration: z.number(),
    })
  ),
});

type Schema = z.infer<typeof schema>;

const Sessions: React.FC = () => {
  const { pendingSettings, setPendingSetting } = useSettings();
  const [customType, setCustomType] = useState('Focus');
  const [customDuration, setCustomDuration] = useState<number | ''>(25);
  const [customTitle, setCustomTitle] = useState('');

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      sessions: pendingSettings.sessions || [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'sessions',
  });

  const handleAddSession = () => {
    if (customType && customDuration) {
      const newSession = {
        id: String(fields.length + 1),
        type: customType,
        title: customTitle,
        duration: Number(customDuration),
      };
      append(newSession);
      setPendingSetting('sessions', [...fields, newSession]);
      setCustomType('Focus');
      setCustomDuration(25);
      setCustomTitle('');
    }
  };

  const handleRemoveSession = (index: number) => {
    remove(index);
    setPendingSetting('sessions', fields.filter((_, i) => i !== index));
  };

  const handleMoveSession = ({ activeIndex, overIndex }: { activeIndex: number; overIndex: number }) => {
    move(activeIndex, overIndex);
    setPendingSetting('sessions', arrayMove(fields, activeIndex, overIndex));
  };

  const handleFieldChange = (index: number, field: 'type' | 'title' | 'duration', value: any) => {
    form.setValue(`sessions.${index}.${field}`, value);
    const updatedSessions = form.getValues('sessions');
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
        <div className="space-y-8 py-8">
          {isLargeScreen && (
            <>
              <div className="grid grid-cols-[0.5fr,1fr,1fr,auto,auto] mb-4">
                <div className="font-bold text-gray-300">Type</div>
                <div className="font-bold text-gray-300">Title</div>
                <div className="font-bold text-gray-300">Length</div>
                <div></div> {/* Empty div to maintain grid structure */}
              </div>
              <Sortable value={fields} onMove={handleMoveSession}>
                {fields.map((field, index) => (
                  <SortableItem key={field.id} value={field.id}>
                    <Card className="border-midnight-700 grid grid-cols-[0.5fr,1fr,1fr,auto,auto] items-center gap-2">
                      <div className='flex gap-2'>
                        <Button
                          className="flex-1"
                          variant={form.getValues(`sessions.${index}.type`) === 'Focus' ? 'primary' : 'secondary'}
                          onClick={() => {
                            form.setValue(`sessions.${index}.type`, 'Focus');
                            handleFieldChange(index, 'type', 'Focus');
                          }}
                        >
                          Focus
                        </Button>
                        <Button
                          className="flex-1"
                          variant={form.getValues(`sessions.${index}.type`) === 'Break' ? 'primary' : 'secondary'}
                          onClick={() => {
                            form.setValue(`sessions.${index}.type`, 'Break');
                            handleFieldChange(index, 'type', 'Break');
                          }}
                        >
                          Break
                        </Button>
                      </div>
                      <Controller
                        control={form.control}
                        name={`sessions.${index}.title`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter Title"
                            className="border text-white w-full ml-4"
                            onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                          />
                        )}
                      />
                      <div className="flex items-center space-x-2 mx-6">
                        <Controller
                          control={form.control}
                          name={`sessions.${index}.duration`}
                          render={({ field }) => (
                            <>
                              <span className="text-gray-300">{field.value}</span>
                              <Slider
                                value={[field.value]}
                                onValueChange={(value) => handleFieldChange(index, 'duration', value[0])}
                                min={0.1}
                                max={120}
                                step={5}
                              />
                            </>
                          )}
                        />
                      </div>

                      <SortableDragHandle
                        variant="secondary"
                        size="icon"
                        className="text-white flex justify-center items-center"
                      >
                        <DragHandleDots2Icon
                          aria-hidden="true"
                          className='w-5 h-5'
                        />
                      </SortableDragHandle>

                      <Button className='px-2 group-hover:visible' variant="secondary" onClick={() => handleRemoveSession(index)}>
                        <X className='text-red-400 w-5 h-5' />
                      </Button>
                    </Card>
                  </SortableItem>
                ))}
              </Sortable>
              <div className="font-bold text-gray-300">Create Session</div>
              <hr className="border-gray-700 mb-4" />
              <Card className="grid grid-cols-[20%,40%,33%,7%] items-center rounded-lg p-4 mb-4 md:space-y-0">
                <div className="flex space-x-4">
                  <Button className="flex-1" variant={customType === 'Focus' ? 'primary' : 'secondary'} onClick={() => setCustomType('Focus')}>
                    Focus
                  </Button>
                  <Button className="flex-1" variant={customType === 'Break' ? 'primary' : 'secondary'} onClick={() => setCustomType('Break')}>
                    Break
                  </Button>
                </div>
                <Input
                  placeholder="Enter Title"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="border text-white w-full ml-4"
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
              <Sortable value={fields} onMove={handleMoveSession}>
                {fields.map((field, index) => (
                  <SortableItem key={field.id} value={field.id}>
                    <Card className="flex flex-col space-y-4 p-4 mb-4">
                      <div className="flex space-x-2">
                        <Button
                          className="flex-1"
                          variant={field.type === 'Focus' ? 'primary' : 'secondary'}
                          onClick={() => handleFieldChange(index, 'type', 'Focus')}
                        >
                          Focus
                        </Button>
                        <Button
                          className="flex-1"
                          variant={field.type === 'Break' ? 'primary' : 'secondary'}
                          onClick={() => handleFieldChange(index, 'type', 'Break')}
                        >
                          Break
                        </Button>
                      </div>
                      <div className='flex space-x-2'>
                        <Controller
                          control={form.control}
                          name={`sessions.${index}.title`}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Enter Title"
                              className="border p-2 text-white w-full"
                              onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                            />
                          )}
                        />
                        <Button className="hidden group-hover:block" variant="secondary" onClick={() => handleRemoveSession(index)}>
                          <X size={16} />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2 w-full">
                        <Controller
                          control={form.control}
                          name={`sessions.${index}.duration`}
                          render={({ field }) => (
                            <>
                              <span className="text-gray-300">{field.value}</span>
                              <Slider
                                value={[field.value]}
                                onValueChange={(value) => handleFieldChange(index, 'duration', value[0])}
                                min={0.1}
                                max={120}
                                step={5}
                                className="flex-grow"
                              />
                            </>
                          )}
                        />
                      </div>
                    </Card>
                  </SortableItem>
                ))}
              </Sortable>
              <div className="font-bold text-gray-300">Create Session</div>
              <Card className="flex flex-col space-y-4 p-4 mb-4">
                <div className="flex space-x-2">
                  <Button className="flex-1" variant={customType === 'Focus' ? 'primary' : 'secondary'} onClick={() => setCustomType('Focus')}>
                    Focus
                  </Button>
                  <Button className="flex-1" variant={customType === 'Break' ? 'primary' : 'secondary'} onClick={() => setCustomType('Break')}>
                    Break
                  </Button>
                </div>
                <div className='flex space-x-2'>
                  <Input
                    placeholder="Enter Title"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="border p-2 text-white w-full"
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
