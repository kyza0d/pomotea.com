import * as React from "react";
import { FiVolume2 } from "react-icons/fi";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";

const Sounds = () => (
  <AccordionItem value="sounds">
    <AccordionTrigger>
      <div className="flex"><FiVolume2 className="icon mr-4" /> <Text variant="header">Sounds</Text></div>
    </AccordionTrigger>
    <AccordionContent>
      <div>Coming Soon</div>
    </AccordionContent>
  </AccordionItem>
);

export default Sounds;
