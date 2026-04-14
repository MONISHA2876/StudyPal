import { createContext, useContext, useState } from "react";
import { themes } from "./theme";

const ThemeContext = createContext<
  { theme: string; setTheme: (theme: string) => void } | undefined
>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setTheme] = useState("light");

  return (
    <ThemeContext.Provider
      //@ts-ignore
      value={{ theme: themes[themeName], themeName, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
