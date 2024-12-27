import { createDeck } from "../components/cards";
import { createPlayers } from "../components/players";
import { useGameContext } from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";
import ColorPopup from "../utils/ColorPopup";
import React, { useState, useEffect } from "react";
import PlayerHand from "../utils/Playerhand";
import BackButton from "../utils/BackButton";
import AppDrawer from "../utils/AppDrawer";

const UNOGame: React.FC = () => {
  const {
    deck,
    setDeck,
    players,
    setPlayers,
    gameOver,
    setGameOver,
    currentPlayerIndex,
    setCurrentPlayerIndex,
    currentCard,
    setCurrentCard,
    shuffleDeck,
    dealCardsOneByOne,
    drawCard,
    setShowColorPopup,
    showColorPopup,
    playedCards,
    setIsClockwise,
  } = useGameContext();

  const [selectedColor, setSelectedColor] = useState<string>("");
  const { theme, themeStyles } = useTheme();
  const [gameStarted, setGameStarted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousCard, setPreviousCard] = useState(currentCard);

  useEffect(() => {
    if (!gameStarted) {
      startGame();
    }
  }, [gameStarted]);
  useEffect(() => {
    if (currentCard) {
      setIsAnimating(true);

      // Bir önceki kartı sakla (animasyon için)
      setPreviousCard(currentCard);

      // Animasyonu bitirmek için timeout
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Animasyon süresine uygun olmalı

      return () => clearTimeout(timeout);
    }
  }, [currentCard]);

  const startGame = async () => {
    const newDeck = createDeck();
    let shuffledDeck = shuffleDeck(newDeck, playedCards);
    const createdPlayers = createPlayers(3);

    let { deck: updatedDeck, players: updatedPlayers } =
      await dealCardsOneByOne(shuffledDeck, createdPlayers);
    let firstCardIndex = 0;
    while (
      updatedDeck[firstCardIndex].value === "+4" ||
      updatedDeck[firstCardIndex].value === "Wild"
    ) {
      firstCardIndex++;
    }

    const firstCard = updatedDeck[firstCardIndex];
    // Remove the chosen card from the deck
    updatedDeck = [
      firstCard,
      ...updatedDeck.slice(0, firstCardIndex),
      ...updatedDeck.slice(firstCardIndex + 1),
    ];
    setDeck(updatedDeck);
    setPlayers(updatedPlayers);
    setCurrentCard(updatedDeck[0]);
    setGameOver(false);
    setCurrentPlayerIndex(0);
    setGameStarted(true);
    setIsClockwise(true);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setShowColorPopup(false);
    setCurrentCard((prevCard) => ({
      ...prevCard!,
      color,
    }));
  };
  return (
    <div
      style={{
        ...styles.container,
        background: themeStyles[theme].background,
        color: themeStyles[theme].textColor,
      }}
    >
      <BackButton />
      <AppDrawer />
      {/* Üstteki oyuncu */}
      <div style={{ ...styles.playersContainer, top: "10px" }}>
        {players.slice(1, 2).map((player) => (
          <PlayerHand
            key={player.id}
            player={player}
            isCurrent={
              currentPlayerIndex ===
              players.findIndex((p) => p.id === player.id)
            }
          />
        ))}
      </div>

      {/* Sol ve sağdaki oyuncular */}
      <div style={{ ...styles.sidePlayersContainer, left: "10px" }}>
        {players.slice(0, 1).map((player) => (
          <PlayerHand
            key={player.id}
            player={player}
            isCurrent={
              currentPlayerIndex ===
              players.findIndex((p) => p.id === player.id)
            }
          />
        ))}
      </div>
      <div style={{ ...styles.sidePlayersContainer, right: "10px" }}>
        {players.slice(2, 3).map((player) => (
          <PlayerHand
            key={player.id}
            player={player}
            isCurrent={
              currentPlayerIndex ===
              players.findIndex((p) => p.id === player.id)
            }
          />
        ))}
      </div>

      {/* Alt oyuncu */}
      <div style={{ ...styles.bottomPlayerContainer }}>
        {players.slice(3).map((player) => (
          <PlayerHand
            key={player.id}
            player={player}
            isCurrent={
              currentPlayerIndex ===
              players.findIndex((p) => p.id === player.id)
            }
          />
        ))}
      </div>

      {/* Geçerli kart ve Çekme kartı */}
      {gameStarted && currentCard && !gameOver && (
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
              background: themeStyles[theme].drawButtonColor,
              color: themeStyles[theme].textColor,
            }}
            onClick={() => drawCard(currentPlayerIndex)}
            disabled={gameOver}
          >
            Draw Card
          </button>
        </div>
      )}

      {/* Oyun bitişi */}
      {gameOver && (
        <div style={styles.cardContainer}>
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
      )}

      {/* Renk değiştirme pop-up */}
      {showColorPopup && (
        <ColorPopup
          onColorSelect={handleColorSelect}
          colors={["green", "blue", "red", "yellow"]}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    position: "relative" as const,
    backgroundSize: "cover",
    backgroundBlendMode: "overlay" as const, // Desenle renk geçişi
  },
  playersContainer: {
    position: "absolute" as const,
    display: "flex",
    flexDirection: "row" as const,
    gap: "10px",
  },
  sidePlayersContainer: {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  bottomPlayerContainer: {
    position: "absolute" as const,
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "row" as const,
    gap: "10px",
  },
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
  drawCardButton: {
    marginTop: "70px",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  startButton: {
    padding: "15px 30px",
    fontSize: "18px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  gameOverContainer: {
    position: "absolute" as const,
    right: "20px",
    top: "60%",
    transform: "translateY(-50%)",
  },
  cardAnimation: {
    opacity: 1,
    transform: "scale(1)",
  },
  cardAnimating: {
    opacity: 0,
    transform: "scale(0.5)",
  },
};

export default UNOGame;
