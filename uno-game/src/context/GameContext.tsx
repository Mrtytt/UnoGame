import React, { createContext, useContext, useState, ReactNode } from "react";
import { Card } from "../components/cards";
import { Player } from "../components/players";

// GameContext için tipler
interface GameContextType {
  deck: Card[];
  players: Player[];
  gameOver: boolean;
  isClockwise: boolean;
  currentPlayerIndex: number;
  currentCard: Card | null;
  setCurrentCard: React.Dispatch<React.SetStateAction<Card>>;
  setDeck: React.Dispatch<React.SetStateAction<Card[]>>;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlayerIndex: React.Dispatch<React.SetStateAction<number>>;
  shuffleDeck: (deck: Card[]) => Card[];
  dealCardsOneByOne: (
    deck: Card[],
    players: Player[]
  ) => Promise<{ deck: Card[]; players: Player[] }>;
  drawCardsForNextPlayer: (playerId: number, numCards: number) => void;
  drawCard: (playerId: number) => void;
  checkUNO: (player: Player) => boolean;
  playTurn: () => void;
  playCard: (playerId: number, card: Card) => void;
  handleCardPlay: (playerId: number, card: Card) => void;
  showColorPopup: boolean;
  setShowColorPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClockwise: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider
export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<Card>(deck[0]);
  const [showColorPopup, setShowColorPopup] = useState(false); // Pop-up gösterme durumu
  const [isClockwise, setIsClockwise] = useState(true); // Oyuncu sırası yönü

  const shuffleDeck = (deck: Card[]): Card[] => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]]; // Kartları yer değiştir
    }
    return deck;
  };

  const dealCardsOneByOne = async (deck: Card[], players: Player[]) => {
    let updatedDeck = [...deck];
    let updatedPlayers = [...players];

    // Her oyuncuya 7 kart dağıtalım
    for (let i = 0; i < updatedPlayers.length; i++) {
      const player = updatedPlayers[i];

      // 7 kartı sırayla dağıtıyoruz
      for (let j = 0; j < 7; j++) {
        const card = updatedDeck.shift(); // Desteden bir kart al
        if (card) {
          player.hand.push(card); // Kartı oyuncunun eline ekle
        }
      }
    }

    // Her kart dağıtıldıktan sonra desteyi güncelliyoruz
    updatedDeck = shuffleDeck(updatedDeck); // Desteyi tekrar karıştır

    return { deck: updatedDeck, players: updatedPlayers };
  };

  const drawCardsForNextPlayer = (
    currentPlayerId: number,
    numCards: number
  ) => {
    // Mevcut oyuncunun dizideki index'ini buluyoruz
    const currentPlayerIndex = players.findIndex(
      (p) => p.id === currentPlayerId
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length; // Sıradaki oyuncuyu seç

    const nextPlayer = players[nextPlayerIndex];

    // Kartları sıradaki oyuncuya ekliyoruz
    for (let i = 0; i < numCards; i++) {
      const drawnCard = deck.shift();
      if (drawnCard) {
        nextPlayer.hand.push(drawnCard);
      }
    }

    setDeck([...deck]);
    setPlayers([...players]);

    // Bir sonraki oyuncuya geçiş yap
    setCurrentPlayerIndex(nextPlayerIndex);
  };

  const drawCard = (playerId: number) => {
    const player = players.find((p) => p.id === playerId + 1);
    if (!player || gameOver) return;

    const drawnCard = deck.shift();
    if (drawnCard) {
      player.hand.push(drawnCard); // Kartı oyuncunun eline ekle
      setDeck([...deck]); // Yeni desteyi güncelle
      setPlayers([...players]); // Oyuncuları güncelle
    }
  };

  const playCard = (playerId: number, card: Card) => {
    const player = players.find((p) => p.id === playerId);
    if (!player) return;

    if (
      currentCard &&
      (card.color === currentCard.color ||
        card.value === currentCard.value ||
        card.color === null)
    ) {
      return handleCardPlay(playerId, card);
    }
  };

  const handleCardPlay = (playerId: number, card: Card) => {
    const player = players.find((p) => p.id === playerId);
    if (!player) return;

    // Oyuncunun elini güncelle
    const updatedHand = player.hand.filter((c) => c !== card);
    const updatedPlayers = players.map((p) =>
      p.id === playerId ? { ...p, hand: updatedHand } : p
    );

    setPlayers(updatedPlayers);

    // Eğer Wild+4 kartı oynandıysa
    if (card.value === "wild+4") {
      drawCardsForNextPlayer(playerId, 4); // Bir sonraki oyuncuya 4 kart çektir
      setCurrentCard(card); // Geçerli kartı ayarla
      setShowColorPopup(true); // Renk seçimi pop-up'ını göster
    }

    // Eğer Wild kartı oynandıysa
    if (card.value === "wild") {
      setCurrentCard(card); // Geçerli kartı ayarla
      setShowColorPopup(true); // Renk seçimi pop-up'ını göster
    }

    // Eğer diğer kartlardansa işlemlere devam et
    setCurrentCard(card);

    if (checkUNO(player)) {
      alert(`${player.name} UNO dedi!`);
    }

    if (updatedHand.length === 0) {
      alert(`${player.name} kazandı!`);
      setGameOver(true);
      return; // Oyuncu kazandıysa diğer işlemleri yapmaya gerek yok
    }

    if (card.value === "+2") {
      drawCardsForNextPlayer(playerId, 2); // 2 kart çektir
    }

    if (card.value === "skip") {
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 2) % players.length);
    }

    if (card.value === "reverse") {
      // Oyuncu sırası tersine döner
      setIsClockwise((prev) => !prev);
    }

    // Gelecek oyuncuya geçiş
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const checkUNO = (player: Player): boolean => {
    if (player.hand.length === 1) {
      console.log(`${player.name} says UNO!`);
      return true;
    }
    return false;
  };

  // Oyuncu sırasını yönetmek
  const playTurn = () => {
    const currentPlayer = players[currentPlayerIndex];

    // İnsan oyuncusu için oyun mantığı burada olacak

    // Sonraki oyuncuya geçiş
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
  };

  return (
    <GameContext.Provider
      value={{
        deck,
        players,
        gameOver,
        currentPlayerIndex,
        currentCard,
        showColorPopup,
        isClockwise,
        setIsClockwise,
        setShowColorPopup,
        setCurrentCard,
        setDeck,
        setPlayers,
        setGameOver,
        setCurrentPlayerIndex,
        shuffleDeck,
        dealCardsOneByOne,
        drawCardsForNextPlayer,
        drawCard,
        checkUNO,
        playTurn,
        playCard,
        handleCardPlay,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Contexti kullanmak için custom hook
export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
