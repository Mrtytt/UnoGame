import React, { useState } from "react";
import { createDeck, Card } from "../components/cards";
import { createPlayers, Player } from "../components/players";
import { useGameContext } from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";
import ColorPopup from "../utils/ColorPopup";
import { getCardStyles } from "../styles/getCardStyles"; // Yeni eklenen import

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
    playCard,
    drawCard,
    setShowColorPopup,
    showColorPopup,
    playedCards,
    setIsClockwise,
  } = useGameContext();

  const [selectedColor, setSelectedColor] = useState<string>(""); // Seçilen renk
  const { theme, themeStyles } = useTheme(); // theme ve themeStyles'ı alıyoruz
  const [gameStarted, setGameStarted] = useState(false); // Yeni state ekledik

  const startGame = async () => {
    const newDeck = createDeck();
    let shuffledDeck = shuffleDeck(newDeck, playedCards);
    const createdPlayers = createPlayers(3);

    let { deck: updatedDeck, players: updatedPlayers } =
      await dealCardsOneByOne(shuffledDeck, createdPlayers);

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
    setShowColorPopup(false); // Renk seçildiğinde pop-up'ı kapat
    setCurrentCard((prevCard) => ({
      ...prevCard!,
      color, // Seçilen rengi geçerli karta uygula
    }));
  };

  return (
    <div
      style={{
        ...styles.container,
        background: themeStyles[theme].background, // Temadan gelen arka plan
        color: themeStyles[theme].textColor,
        flexDirection: gameStarted ? "row" : "column",
        alignItems: gameStarted ? "flex-start" : "center", // Temadan gelen yazı rengi
      }}
    >
      {/* Oyuncuların elleri */}
      <div style={styles.playersContainer}>
        {players.map((player) => (
          <div
            key={player.id}
            style={{
              ...styles.playerContainer,
              backgroundColor:
                currentPlayerIndex ===
                players.findIndex((p) => p.id === player.id)
                  ? "#001f3f" // Sırası gelen oyuncunun arka plan rengi
                  : "#fff", // Diğer oyuncular için varsayılan arka plan rengi
              color:
                currentPlayerIndex ===
                players.findIndex((p) => p.id === player.id)
                  ? "#fff" // Sırası gelen oyuncunun yazı rengi
                  : "#000", // Diğer oyuncular için varsayılan yazı rengi
            }}
          >
            <h3
              style={{
                backgroundColor:
                  currentPlayerIndex ===
                  players.findIndex((p) => p.id === player.id)
                    ? "#fff" // Sırası gelen oyuncunun isminin arka plan rengi
                    : "transparent",
                color:
                  currentPlayerIndex ===
                  players.findIndex((p) => p.id === player.id)
                    ? "#000" // Sırası gelen oyuncunun isminin yazı rengi
                    : "inherit", // Diğer oyuncular için varsayılan yazı rengi
                padding: "5px",
                borderRadius: "5px",
                display: "inline-block",
              }}
            >
              {player.name}
            </h3>
            <div style={styles.handContainer}>
              {player.hand.map((card) => (
                <button
                  key={card.id}
                  style={{
                    ...styles.cardButton,
                    ...getCardStyles(card.color || "default"),
                    visibility:
                      currentPlayerIndex ===
                      players.findIndex((p) => p.id === player.id)
                        ? "visible" // Sırası gelen oyuncunun isminin yazı rengi
                        : "hidden",
                  }}
                  onClick={() => playCard(player.id, card)}
                  disabled={
                    gameOver ||
                    currentPlayerIndex !==
                      players.findIndex((p) => p.id === player.id)
                  }
                >
                  {card.value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {gameStarted && currentCard && (
        <div style={styles.drawCardButtonContainer}>
          <button
            style={styles.drawCardButton}
            onClick={() => drawCard(currentPlayerIndex)}
            disabled={gameOver}
          >
            Kart Çek
          </button>
        </div>
      )}

      {/* Geçerli kart */}
      {gameStarted && currentCard && (
        <div style={styles.cardContainer}>
          <h3>Geçerli Kart</h3>
          <div
            style={{
              ...getCardStyles(currentCard.color || "default"),
            }}
          >
            <label>{currentCard.value}</label>
          </div>
        </div>
      )}

      {/* Başlatma butonu */}
      {!gameOver && (
        <button style={styles.startButton} onClick={startGame}>
          Oyunu Başlat
        </button>
      )}

      {/* Oyun bitişi */}
      {gameOver && <h2>Oyun Bitti!</h2>}

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
    padding: "20px",
    textAlign: "center" as const,
    minHeight: "100vh",
    display: "flex",

    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    backgroundSize: "cover",
    backgroundBlendMode: "overlay" as const, // Desenle renk geçişi
  },
  cardContainer: {
    position: "absolute" as const,
    right: "20px",
    top: "35%",
    transform: "translateY(-50%)",
    textAlign: "center" as const,
  },
  drawCardButton: {
    padding: "15px 30px",
    fontSize: "1.2rem",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    right: "20px",
  },
  card: {
    padding: "10px",
    border: "1px solid #000",
    borderRadius: "8px",
    display: "inline-block",
    margin: "10px",
    fontSize: "20px",
  },
  playersContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  playerContainer: {
    padding: "5px",
    border: "2px solid #000",
    borderRadius: "8px",
    margin: "5px",
    transition: "background-color 0.3s, color 0.3s",
  },
  handContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  cardButton: {
    padding: "10px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "5px",
    border: "1px solid #ccc",
    background: "#fff",
    transition: "background-color 0.2s",
  },
  startButton: {
    padding: "10px",
    fontSize: "1.2rem",
    background: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    position: "absolute" as const,
    right: "20px",
    top: "60%",
    transform: "translateY(-50%)",
  },
  drawCardButtonContainer: {
    position: "absolute" as const,
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
  },
};

export default UNOGame;
