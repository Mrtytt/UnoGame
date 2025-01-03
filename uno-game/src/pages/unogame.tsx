import { Card, createDeck } from "../components/cards";
import { createPlayers } from "../components/players";
import { useGameContext } from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";
import ColorPopup from "../utils/ColorPopup";
import React, { useState, useEffect } from "react";
import PlayerHand from "../utils/Playerhand";
import BackButton from "../utils/BackButton";
import AppDrawer from "../utils/AppDrawer";
import { GameOverUI } from "../utils/GameOverUI";
import CardDisplay from "../utils/CardDisplay";
import UnoButton from "../utils/UnoButton";

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
    drawCardsForNextPlayer,
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

      {gameOver && (
        <GameOverUI
          playerId={(currentPlayerIndex - 1) % players.length}
          startGame={startGame}
          theme={theme}
          themeStyles={themeStyles}
        />
      )}
      <CardDisplay
        gameStarted={gameStarted}
        currentCard={currentCard}
        previousCard={previousCard}
        isAnimating={isAnimating}
        gameOver={gameOver}
        drawCard={drawCard}
        currentPlayerIndex={currentPlayerIndex}
      />
      <UnoButton
        gameOver={gameOver}
      />

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
    top: "35%",
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
};

export default UNOGame;
