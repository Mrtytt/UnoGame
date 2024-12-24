import React from "react";
import { useGameContext } from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";
import { Player } from "../components/players";
import { getCardStyles } from "../styles/getCardStyles";

const MAX_VISIBLE_CARDS = 7; // Ekranda görünen maksimum kart sayısı

const PlayerHand = ({
  player,
  isCurrent,
}: {
  player: Player;
  isCurrent: boolean;
}) => {
  const { playCard } = useGameContext();
  const { themeStyles, theme } = useTheme();

  const visibleCards = player.hand.slice(0, MAX_VISIBLE_CARDS);
  const remainingCardsCount = player.hand.length - MAX_VISIBLE_CARDS;
  const currentTheme = themeStyles[theme];

  return (
    <div
      style={{
        ...styles.playerContainer,
        backgroundColor: isCurrent
          ? currentTheme.handContainer.currentPlayer
          : currentTheme.handContainer.others,
        color: isCurrent
          ? currentTheme.nameTextColor.currentPlayer
          : currentTheme.nameTextColor.others,
      }}
    >
      <h3
        style={{
          ...styles.heading,
          color: isCurrent
            ? currentTheme.nameTextColor.currentPlayer
            : currentTheme.nameTextColor.others,
        }}
      >
        {player.name}
      </h3>
      <div
        style={{
          ...styles.handContainer,
          overflowX: isCurrent ? "auto" : "hidden", // Scroll sadece sırası olan oyuncuya
          display: "flex",
        }}
      >
        {visibleCards.map((card, index) => (
          <div
            key={index}
            style={
              isCurrent
                ? getCardStyles(card.color || "default", card.value)
                : styles.cardBack
            }
            onClick={() => (isCurrent ? playCard(player.id, card) : null)}
          >
            {isCurrent ? card.value : ""}
          </div>
        ))}

        {/* Kart sayısı fazla ise "..." göstermek */}
        {remainingCardsCount > 0 && !isCurrent && (
          <div style={styles.remainingCards}>+{remainingCardsCount}</div>
        )}

        {/* Sırası olan kullanıcıya ek kartları yatay scroll ile göster */}
        {isCurrent &&
          player.hand.slice(MAX_VISIBLE_CARDS).map((card, index) => (
            <div
              key={MAX_VISIBLE_CARDS + index}
              style={getCardStyles(card.color || "default", card.value)}
              onClick={() => playCard(player.id, card)}
            >
              {card.value}
            </div>
          ))}
      </div>
    </div>
  );
};

const styles = {
  playerContainer: {
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  handContainer: {
    display: "flex",
    gap: "5px",
    padding: "10px 0",
    maxWidth: "475px", // Sabit genişlik
    height: "100px",
    overflowX: "hidden", // Fazla kartlar gizlenir, kaydırma kullanıcı sırasına göre kontrol edilir
  },
  cardBack: {
    width: "75px",
    height: "100px",
    backgroundImage: `url('/cardback.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "5px",
  },
  remainingCards: {
    fontSize: "20px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "60px",
    backgroundColor: "#ccc",
    borderRadius: "5px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "5%", // Center vertically if needed
  },
};

export default PlayerHand;
