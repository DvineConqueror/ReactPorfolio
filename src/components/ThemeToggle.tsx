import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  // Use the theme context if available, otherwise fallback to local state
  const themeContext = useTheme ? useTheme() : null;
  const [theme, setTheme] = useState<"light" | "dark">(
    themeContext?.theme || "light",
  );

  // Effect to initialize theme from localStorage or system preference
  useEffect(() => {
    // If we have a theme context, don't manage state locally
    if (themeContext) return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, [themeContext]);

  // Effect to apply theme to document
  useEffect(() => {
    // If we have a theme context, don't manage DOM updates locally
    if (themeContext) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, themeContext]);

  const toggleTheme = () => {
    if (themeContext) {
      themeContext.setTheme(themeContext.theme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const currentTheme = themeContext?.theme || theme;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full bg-background transition-colors ${className}`}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        {currentTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"}
      </span>
    </Button>
  );
};

export default ThemeToggle;
