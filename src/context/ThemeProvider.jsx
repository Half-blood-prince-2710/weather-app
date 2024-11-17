import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeProviderContext =
  createContext();

const Theme = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

const initialState = {
  theme: Theme.SYSTEM,
  setTheme: () => null,
};

const ThemeProvider = ({
  children,
  defaultTheme = Theme.SYSTEM,
  storageKey = "vite-ui-theme",
  ...props
}) => {
  const [theme, setTheme] = useState(
    () => {
      const storedTheme =
        localStorage.getItem(
          storageKey
        );
      return (
        storedTheme || defaultTheme
      );
    }
  );

  useEffect(() => {
    const root =
      window.document.documentElement;
    root.classList.remove(
      Theme.LIGHT,
      Theme.DARK
    );

    if (theme === Theme.SYSTEM) {
      const systemTheme =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
          ? Theme.DARK
          : Theme.LIGHT;
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(
        storageKey,
        newTheme
      );
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(
    ThemeProviderContext
  );
  if (context === undefined) {
    throw new Error(
      "useTheme must be used within a ThemeProvider. Ensure you have wrapped your app with ThemeProvider."
    );
  }
  return context;
};

export { ThemeProvider, useTheme };
