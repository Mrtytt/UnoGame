import React from "react";
import { Player } from "../components/players"; // Oyuncu türünü kullanıyorsanız türü içe aktarın.
import { calculateRemainingPoints } from "./calculateRemainingPoints";
import { useGameContext } from "../context/GameContext";

interface GameOverUIProps {
  playerId: number;
  startGame: () => void;
  theme: string;
  themeStyles: {
    [key: string]: { textColor: string; drawButtonColor: string };
  };
}

export const GameOverUI: React.FC<GameOverUIProps> = ({
  playerId,
  startGame,
  theme,
  themeStyles,
}) => {
  const { isClockwise, players} = useGameContext();
  const adjustedIndex = isClockwise
    ? (playerId + 1 ) % players.length // Saat yönündeyse sıradaki oyuncu
    : (playerId + 1 + players.length) % players.length;

  const winner = players.find((player) => player.id === adjustedIndex + 1);
  const remainingPoints = calculateRemainingPoints(players, playerId);

  return (
    <div style={styles.cardContainer}>
      <div style={{ marginBottom: "16px", textAlign: "center" }}>
        <h2 style={{ color: themeStyles[theme].textColor }}>
          Winner: {winner?.name || "Unknown"}
        </h2>
        <h3 style={{ color: themeStyles[theme].textColor }}>
          Winning Points: {remainingPoints}
        </h3>
      </div>
      <button
        style={{
          ...styles.drawCardButton,
          background: themeStyles[theme].drawButtonColor,
          color: themeStyles[theme].textColor,
        }}
        onClick={startGame}
      >
        Restart Game
      </button>
    </div>
  );
};
const styles = {
  cardContainer: {
    position: "absolute" as const,
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    top: "50%",
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
