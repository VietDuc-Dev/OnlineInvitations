"use client";
import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={handleToggle}
    >
      {theme === "light" ? (
        <FaMoon className="size-4" />
      ) : (
        <FaSun className="size-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;
