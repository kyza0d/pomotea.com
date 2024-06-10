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
        <div className="flex"><FiBell className="icon-sm mr-4" /> <Text variant="header">Notifications</Text></div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Checkbox
            id="notify-break"
            checked={settings["notify-breaks"]}
            onCheckedChange={(checked) => handleCheckboxChange("notify-breaks", Boolean(checked))}
          />
          <label htmlFor="notify-break">
            <Text size="sm"> Notify breaks </Text>
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <Checkbox
            id="notify-focus"
            checked={settings["notify-focus"]}
            onCheckedChange={(checked) => handleCheckboxChange("notify-focus", Boolean(checked))}
          />
          <label htmlFor="notify-focus">
            <Text size="sm"> Notify focus </ Text>
          </label>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Notifications;
