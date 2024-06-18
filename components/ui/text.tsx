import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "header" | "subtitle" | "label" | "default";
}

const Text: React.FC<TextProps> = ({ children, className, size = "md", variant = "default" }) => {

  const sizeClass = `custom-text-${size}`;

  const variantMap = {
    header: "h1",
    subtitle: "h2",
    label: "label",
    default: "p",
  };

  const variantStyles: { [key: string]: string } = {
    header: "font-bold text-theme-header",
    subtitle: "font-bold text-theme-subtitle",
    label: "label-text font-semibold",
    default: "default-text",
  };

  const variantClass = variantStyles[variant] || "default";

  const tag = variantMap[variant] || variantMap["default"];

  return React.createElement(
    tag,
    {
      className: cn(sizeClass, className, "max-w-[30ch]", variantClass),
    },
    children
  );
};

export { Text };
