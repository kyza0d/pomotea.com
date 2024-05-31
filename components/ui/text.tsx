
import * as React from "react";
import { cn } from "@/lib/utils";

import "@/app/font-sizes.css";

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "header" | "subtitle" | "default";
}

const Text: React.FC<TextProps> = ({ children, className, size = "sm", variant = "default" }) => {
  const sizeClass = `custom-text-${size}`;

  const variantMap = {
    header: "h1",
    subtitle: "h2",
    default: "p"
  };

  const variantStyles: { [key: string]: string } = {
    header: "font-bold text-midnight-800 dark:text-midnight-200",
    subtitle: "font-semibold text-midnight-600 dark:text-midnight-400"
  };

  const variantClass = variantStyles[variant] || "default";

  const tag = variantMap[variant] || variantMap["default"];

  return React.createElement(
    tag,
    {
      className: cn(sizeClass, "text-midnight-600 dark:text-midnight-400 max-w-[30ch]", variantClass, className)
    },
    children
  );
};

export { Text };
