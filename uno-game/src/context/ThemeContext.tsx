import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "black" | "white" | "navy" | "sunset" | "forest" | "candy";

// Tema özelliklerini tanımla
interface ThemeStyles {
  background: string;
  textColor: string;
  cardBackground: string;
  cardText: string;
  handContainer: {
    currentPlayer: string;
    others: string;
  };
  nameTextColor: {
    currentPlayer: string;
    others: string;
  };
  drawButtonColor:string;
}

interface ThemeContextType {
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
  themeStyles: Record<Theme, ThemeStyles>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
      handContainer: {
        currentPlayer: "rgba(255, 255, 255, 0.9)",
        others: "rgba(220, 220, 220, 0.2)",
      },
      nameTextColor: {
        currentPlayer: "#2e2e2e",
        others: "#555555",
      },
      drawButtonColor: "rgba(73, 76, 69, 0.9)"
    },
    white: {
      background:
        "linear-gradient(135deg, #f8f9fa, #e0e0e0), url('https://www.transparenttextures.com/patterns/white-brushed.png')",
      textColor: "#2e2e2e",
      cardBackground: "rgba(255, 255, 255, 0.9)",
      cardText: "#555555",
      handContainer: {
        currentPlayer: "rgba(50, 50, 50, 0.9)",
        others: "rgba(70, 70, 70, 0.2)",
      },
      nameTextColor: {
        currentPlayer: "#cdd6f4",
        others: "#a5a5a5",
      },
      drawButtonColor:"rgba(66, 66, 66, 0.9)"
    },
    navy: {
      background:
        "linear-gradient(135deg, #1a1b41, #24285b), url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
      textColor: "#e0def4",
      cardBackground: "rgba(37, 39, 77, 0.9)",
      cardText: "#f0f0f0",
      handContainer: {
        currentPlayer: "rgba(134, 77, 181, 0.9)",
        others: "rgba(50, 50, 80, 0.1)",
      },
      nameTextColor: {
        currentPlayer: "#e0def4",
        others: "#c5c5d8",
      },
      drawButtonColor:"rgba(41, 40, 40, 0.9)"
    },
    sunset: {
      background:
        "linear-gradient(135deg, #ff7e5f, #feb47b), url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
      textColor: "#ffffff",
      cardBackground: "rgba(255, 119, 72, 0.9)",
      cardText: "#f5f5f5",
      handContainer: {
        currentPlayer: "rgba(213, 181, 126, 0.84)",
        others: "rgba(255, 140, 100, 0.2)",
      },
      nameTextColor: {
        currentPlayer: "#ffffff",
        others: "#ffe6e6",
      },
      drawButtonColor:"rgba(50, 50, 50, 0.9)"
    },
    forest: {
      background:
        "linear-gradient(135deg, #005c5b, #067d68), url('https://www.transparenttextures.com/patterns/green-gobbler.png')",
      textColor: "#f0fff0",
      cardBackground: "rgba(34, 94, 84, 0.95)",
      cardText: "#d4edda",
      handContainer: {
        currentPlayer: "rgba(44, 162, 142, 0.95)",
        others: "rgba(40, 110, 100, 0.2)",
      },
      nameTextColor: {
        currentPlayer: "#f0fff0",
        others: "#d4edda",
      },
      drawButtonColor:"rgba(50, 50, 50, 0.9)"
    },
    candy: {
      background:
        "linear-gradient(135deg, #ff9a9e, #fad0c4), url('https://www.transparenttextures.com/patterns/candyhole.png')",
      textColor: "#4b0082",
      cardBackground: "rgba(255, 182, 193, 0.9)",
      cardText: "#800080",
      handContainer: {
        currentPlayer: "rgba(255, 102, 158, 0.9)",
        others: "rgba(255, 200, 210, 0.2)",
      },
      nameTextColor: {
        currentPlayer: "#4b0082",
        others: "#800080",
      },
      drawButtonColor:"rgba(243, 126, 247, 0.9)"
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};
