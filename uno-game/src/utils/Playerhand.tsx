import React, { useState } from "react";
import { useGameContext } from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";
import { Player } from "../components/players";
import { getCardStyles } from "../styles/getCardStyles";

const MAX_VISIBLE_CARDS = 7; // Ekranda görünen maksimum kart sayısı

export const PlayerHand = ({
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

  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [animationState, setAnimationState] = useState(false);

  const handleCardClick = (cardIndex: number, card: any) => {
    if (isCurrent) {
      setSelectedCard(cardIndex);
      setAnimationState(true);

      setTimeout(() => {
        playCard(player.id, card); // Kartın oyun mantığını tetikleme
        setAnimationState(false);
        setSelectedCard(null);
      }, 1000); // Animasyon süresi kadar bekle
    }
  };
  const getCardTransform = (position: "top" | "right" | "bottom" | "left") => {
    switch (position) {
      case "top":
        return "translate(-50%, 250%)";
      case "right":
        return "translate(-950%, -50%)";
      case "bottom":
        return "translate(-50%, -350%)";
      case "left":
        return "translate(850%, -50%)";
      default:
        return "translate(-50%, -50%)";
    }
  };

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
            style={{
              ...(isCurrent
                ? getCardStyles(card.color || "default", card.value)
                : styles.cardBack),
              ...(selectedCard === index && animationState
                ? {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transition: "all 1s ease-out",
                    transform: getCardTransform(player.playerPosition), // Oyuncuya göre hareket
                    zIndex: 10, // Kartın üstte olması için
                  }
                : {}),
            }}
            onClick={() => handleCardClick(index, card)}
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
  },
  handContainer: {
    display: "flex",
    gap: "5px",
    padding: "10px 0",
    maxWidth: "350px", // Sabit genişlik
    height: "75px",
    overflowX: "hidden",
  },
  cardBack: {
    width: "50px",
    height: "75px",
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
  cardMoving: {
    position: "absolute" as const,
    left: "50%", // Ortaya hareket
    top: "0%",
    transform: "translate(-50%, -100%) scale(1.2)", // Ortalamak ve büyütmek
    transition: "all 1s ease-out",
    zIndex: 10, // Kartın üstte olması için
  },
};

export default PlayerHand;
