import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "black" | "white" | "navy" | "sunset" | "forest" | "candy";

// Tema özelliklerini tanımla
interface ThemeStyles {
  background: string;
  textColor: string;
  cardBackground: string;
  cardText: string;
}

interface ThemeContextType {
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
  themeStyles: Record<Theme, ThemeStyles>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("black");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const themeColors = themeStyles[theme];
    document.body.style.background = themeColors.background;
    document.body.style.color = themeColors.textColor;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const themeStyles: Record<Theme, ThemeStyles> = {
    black: {
      background:
        "linear-gradient(135deg, #121212, #1e1e2e), url('https://www.transparenttextures.com/patterns/black-thread.png')",
      textColor: "#cdd6f4",
      cardBackground: "rgba(50, 50, 50, 0.9)",
      cardText: "#f0f0f0",
    },
    white: {
      background:
        "linear-gradient(135deg, #f8f9fa, #e0e0e0), url('https://www.transparenttextures.com/patterns/white-brushed.png')",
      textColor: "#2e2e2e",
      cardBackground: "rgba(255, 255, 255, 0.9)",
      cardText: "#555555",
    },
    navy: {
      background:
        "linear-gradient(135deg, #1a1b41, #24285b), url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
      textColor: "#e0def4",
      cardBackground: "rgba(37, 39, 77, 0.9)",
      cardText: "#f0f0f0",
    },
    sunset: {
      background:
        "linear-gradient(135deg, #ff7e5f, #feb47b), url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
      textColor: "#ffffff",
      cardBackground: "rgba(255, 119, 72, 0.9)",
      cardText: "#f5f5f5",
    },
    forest: {
      background:
        "linear-gradient(135deg, #005c5b, #067d68), url('https://www.transparenttextures.com/patterns/green-gobbler.png')",
      textColor: "#f0fff0",
      cardBackground: "rgba(34, 94, 84, 0.95)",
      cardText: "#d4edda",
    },
    candy: {
      background:
        "linear-gradient(135deg, #ff9a9e, #fad0c4), url('https://www.transparenttextures.com/patterns/candyhole.png')",
      textColor: "#4b0082",
      cardBackground: "rgba(255, 182, 193, 0.9)",
      cardText: "#800080",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};
