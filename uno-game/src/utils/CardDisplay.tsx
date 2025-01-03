import React from "react";
import { Card } from "../components/cards";
import { useTheme } from "../context/ThemeContext";

interface CardDisplayProps {
  gameStarted: boolean;
  currentCard: Card | null; // Make sure currentCard is either Card or null
  previousCard: Card | null; // Same for previousCard
  isAnimating: boolean;
  gameOver: boolean;
  drawCard: (playerId: number) => void;
  currentPlayerIndex: number;
}

const CardDisplay: React.FC<CardDisplayProps> = ({
  gameStarted,
  currentCard,
  previousCard,
  isAnimating,
  gameOver,
  drawCard,
  currentPlayerIndex
}) => {
    const { theme, themeStyles } = useTheme();
  
  const styles = {
    cardContainer: {
      position: "absolute" as const,
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      top: "45%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center" as const,
    },
    card: {
      height: "75px",
      width: "75px",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      color: "#fff",
      position: "absolute" as const,
      transition: "opacity 0.5s ease, transform 0.5s ease",
      marginTop: "20px",
    },
    cardAnimation: {
      opacity: 1,
      transform: "scale(1)",
    },
    cardAnimating: {
      opacity: 0,
      transform: "scale(0.5)",
    },
    drawCardButton: {
      marginTop: "70px",
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  // Return null if conditions are not met
  if (!gameStarted || !currentCard || gameOver) {
    return null;
  }

  return (
    <div style={styles.cardContainer}>
      <h2>Current Card</h2>
      <div
        style={{
          ...styles.card,
          ...styles.cardAnimation,
          ...(isAnimating && styles.cardAnimating),
          backgroundColor: previousCard?.color || "transparent",
          color: previousCard?.color === "yellow" ? "black" : "white",
        }}
      >
        {previousCard?.value}
      </div>
      {!isAnimating && currentCard && (
        <div
          style={{
            ...styles.card,
            backgroundColor: currentCard.color || "transparent",
            color: currentCard.color === "yellow" ? "black" : "white",
          }}
        >
          {currentCard.value}
        </div>
      )}
      <button
        style={{
          ...styles.drawCardButton,
          background: themeStyles[theme].handContainer.currentPlayer,
          color: themeStyles[theme].nameTextColor.currentPlayer,
        }}
        onClick={() => drawCard(currentPlayerIndex)}
        disabled={gameOver}
      >
        Draw Card
      </button>
    </div>
  );
};

export default CardDisplay;
