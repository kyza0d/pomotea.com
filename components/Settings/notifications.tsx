import { FiBell } from "react-icons/fi";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";
import { Checkbox } from "@/components/ui/checkbox";
import { useSettings } from "./context";

const Notifications = () => {
  const { settings, updateSetting } = useSettings();

  const handleCheckboxChange = (name: string, value: boolean) => {
    updateSetting(name, value);
  };

  return (
    <AccordionItem value="notifications">
      <AccordionTrigger>
        <div className="flex"><FiBell className="icon mr-4" /> <Text variant="header">Notifications</Text></div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Checkbox
            id="notify-break"
            checked={settings["notify-breaks"]}
            onCheckedChange={(checked) => handleCheckboxChange("notify-breaks", Boolean(checked))}
          />
          <label htmlFor="notify-break">
            <Text> Notify breaks </Text>
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <Checkbox
            id="notify-work"
            checked={settings["notify-work"]}
            onCheckedChange={(checked) => handleCheckboxChange("notify-work", Boolean(checked))}
          />
          <label htmlFor="notify-work">
            <Text> Notify work </ Text>
          </label>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Notifications;
