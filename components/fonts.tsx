import React from "react";
import Button from "./modules/button";
import "../app/fonts.css";

export default function Fonts() {
  const handleClick = (font_family: string) => {
    document.body.className = `font-${font_family}`;
  };

  return (
    <div className="grid grid-cols-3">
      <Button onClick={() => handleClick("monospace")}>Monospace</Button>
      <Button onClick={() => handleClick("roboto-mono")}>Roboto Mono</Button>
      <Button onClick={() => handleClick("jetbrains-mono")}>JetBrains Mono</Button>
      <Button onClick={() => handleClick("inter")}>Inter</Button>
      <Button onClick={() => handleClick("manrope")}>Manrope</Button>
    </div>
  );
}
