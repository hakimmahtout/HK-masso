import { Moon, Sun } from "lucide-react";

import Button from "./Button";
import { useLightDarkMode } from "../../contexts/LigthDarkModeContext";

export function ThemeToggle() {
  const { isDarkMode, toggleLightDarkMode } = useLightDarkMode();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLightDarkMode}
      aria-label={
        isDarkMode === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="rounded-full p-2"
    >
      {isDarkMode ? (
        <Sun className="h-[1.15rem] w-[1.15rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
      ) : (
        <Moon className="h-[1.15rem] w-[1.15rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
      )}
    </Button>
  );
}
