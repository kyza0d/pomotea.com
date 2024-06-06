
import * as React from "react";
import { FiLayout } from "react-icons/fi";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";

const LayoutSettings = () => (
  <AccordionItem value="layout">
    <AccordionTrigger>
      <div className="flex"><FiLayout className="icon mr-4" /> <Text variant="header">Layout</Text></div>
    </AccordionTrigger>
    <AccordionContent>
      <div>Coming Soon</div>
    </AccordionContent>
  </AccordionItem>
);

export default LayoutSettings;
