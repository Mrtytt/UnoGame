import React, { useState } from "react";
import { createDeck, Card } from "../components/cards";
import { createPlayers, Player } from "../components/players";
import { useGameContext } from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";

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
    checkUNO,
    drawCardsForNextPlayer,
    playCard,
    handleCardPlay,
    drawCard,
    setShowColorPopup,
    showColorPopup
  } = useGameContext();
 
  const [selectedColor, setSelectedColor] = useState<string>(""); // Seçilen renk
  const { theme, themeStyles } = useTheme(); // theme ve themeStyles'ı alıyoruz

  const startGame = async () => {
    const newDeck = createDeck(); // Yeni deste oluştur
    let shuffledDeck = shuffleDeck(newDeck); // Desteyi karıştır
    const createdPlayers = createPlayers(3); // 1 İnsan + 3 Bot

    // Kartları sırayla dağıtıyoruz
    let { deck: updatedDeck, players: updatedPlayers } =
      await dealCardsOneByOne(shuffledDeck, createdPlayers);

    setDeck(updatedDeck); // Karıştırılmış yeni desteyi set et
    setPlayers(updatedPlayers); // Oyuncuları set et
    setCurrentCard(updatedDeck[0]); // İlk kartı ortaya koy
    setGameOver(false);
    setCurrentPlayerIndex(0); // Oyunu ilk oyuncu başlatacak
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
        color: themeStyles[theme].textColor, // Temadan gelen yazı rengi
      }}
    >
      <h1>UNO Game</h1>

      {/* Geçerli kart */}
      <div style={styles.cardContainer}>
        <h2>Geçerli Kart</h2>
        {currentCard && (
          <div style={styles.card}>
            <span>{currentCard.color}</span>
            <span>{currentCard.value}</span>
          </div>
        )}
      </div>

      {/* Oyuncuların elleri */}
      <div style={styles.playersContainer}>
        {players.map((player) => (
          <div key={player.id} style={styles.playerContainer}>
            <h3>{player.name}</h3>
            <div style={styles.handContainer}>
              {player.hand.map((card) => (
                <button
                  key={card.id}
                  style={styles.cardButton}
                  onClick={() => playCard(player.id, card)}
                  disabled={
                    gameOver ||
                    currentPlayerIndex !==
                      players.findIndex((p) => p.id === player.id)
                  }
                >
                  {card.value} {card.color}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Kart çekme butonu sağda ortada */}
      <div style={styles.drawCardButtonContainer}>
        <button
          style={styles.drawCardButton}
          onClick={() => drawCard(currentPlayerIndex)}
          disabled={gameOver}
        >
          Kart Çek
        </button>
      </div>

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
        <div style={styles.popup}>
          <h3>Renk Seçin:</h3>
          <button onClick={() => handleColorSelect("green")}>Yeşil</button>
          <button onClick={() => handleColorSelect("blue")}>Mavi</button>
          <button onClick={() => handleColorSelect("red")}>Kırmızı</button>
          <button onClick={() => handleColorSelect("yellow")}>Sarı</button>
        </div>
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
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    backgroundSize: "cover",
    backgroundBlendMode: "overlay" as const, // Desenle renk geçişi
  },
  cardContainer: {
    marginBottom: "20px",
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
    padding: "20px",
    border: "1px solid #000",
    borderRadius: "8px",
    display: "inline-block",
    margin: "10px",
  },
  playersContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  playerContainer: {
    padding: "10px",
    border: "2px solid #000",
    borderRadius: "8px",
    margin: "10px",
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
    padding: "15px 30px",
    fontSize: "1.2rem",
    background: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  drawCardButtonContainer: {
    marginTop: "20px",
  },
  popup: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 999,
  },
};

export default UNOGame;
