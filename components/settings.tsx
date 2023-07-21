"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { FiSettings } from "react-icons/fi";
import { concat } from "@/utils";
import Fonts from "./fonts";

const SettingsContext = createContext({ isOpen: false, toggleSettings: () => { } });

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const backdropRef = useRef(null);

  const toggleSettings = () => setIsOpen(prevIsOpen => !prevIsOpen);
  const handleCheckboxChange = () => setIsChecked(prevIsChecked => !prevIsChecked);

  const handleBackdropClick = (event: MouseEvent) => {
    event.target === backdropRef.current && toggleSettings();
  };

  useEffect(() => {
    document.addEventListener("click", handleBackdropClick);
    return () => {
      document.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  useEffect(() => {
    const savedValue = localStorage.getItem("isChecked");
    if (savedValue !== null) {
      setIsChecked(JSON.parse(savedValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isChecked", JSON.stringify(isChecked));
  }, [isChecked]);

  return (
    <SettingsContext.Provider value={{ isOpen, toggleSettings }}>
      <>
        <button onClick={toggleSettings}>
          <FiSettings />
        </button>

        {isOpen && (
          <div
            ref={backdropRef}
            className={concat(
              "bg-black bg-opacity-75",
              "fixed top-0 left-0 right-0 bottom-0",
              "flex items-center justify-center"
            )}
          >
            <div className="bg-[#1A1C1E] w-[80vw] h-[85vh] p-4 rounded-lg">
              <h2>Fonts:</h2>
              <Fonts />
              <label htmlFor="checkbox">
                <input type="checkbox" id="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                Persist Checkbox Value
              </label>
              <button onClick={toggleSettings}>Close</button>
            </div>
          </div>
        )}
      </>
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { Settings, useSettings };
