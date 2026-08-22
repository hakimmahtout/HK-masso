import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const LightDarkModeContext = createContext();

function LightDarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    },
    [isDarkMode],
  );

  function toggleLightDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <LightDarkModeContext.Provider value={{ isDarkMode, toggleLightDarkMode }}>
      {children}
    </LightDarkModeContext.Provider>
  );
}

function useLightDarkMode() {
  const context = useContext(LightDarkModeContext);
  if (context === undefined)
    throw new Error(
      "LightDarkModeContext was used outside of DarkModeProvider",
    );
  return context;
}

export { LightDarkModeProvider, useLightDarkMode };
