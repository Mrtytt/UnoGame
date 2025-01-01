import React from "react";
import { useGameContext } from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";

interface UnoButtonProps {
  gameOver: boolean;
}

const UnoButton: React.FC<UnoButtonProps> = ({gameOver}) => {
  const { players, currentPlayerIndex,handleCallUno} =
    useGameContext();
  const { theme, themeStyles } = useTheme();

  // Güvenlik kontrolü: Oyuncu listesi ve geçerli oyuncu kontrolü
  const currentPlayer = players?.[currentPlayerIndex];

  if (gameOver) {
    return null;
  }

  return (
    <div style={styles.cardContainer}>
      <button
        style={{
          ...styles.callUnoButton,
          background: themeStyles[theme]?.drawButtonColor || "gray",
          color: themeStyles[theme]?.textColor || "white",
        }}
        onClick={handleCallUno}
        disabled={gameOver || !currentPlayer || currentPlayer.hand.length > 2}
      >
        Call UNO
      </button>
    </div>
  );
};

const styles = {
  callUnoButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  cardContainer: {
    position: "absolute" as const,
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    top: "63%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center" as const,
  },
};

export default UnoButton;
