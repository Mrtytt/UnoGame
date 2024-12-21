import React, { createContext, useContext, useState, ReactNode } from "react";
import { Card } from "../components/cards";
import { Player } from "../components/players";
import { CloudCircle } from "@mui/icons-material";

// GameContext için tipler
interface GameContextType {
  deck: Card[];
  players: Player[];
  gameOver: boolean;
  isClockwise: boolean;
  currentPlayerIndex: number;
  playedCards: Card[];
  currentCard: Card | null;
  setPlayedCards: React.Dispatch<React.SetStateAction<Card[]>>;
  setCurrentCard: React.Dispatch<React.SetStateAction<Card>>;
  setDeck: React.Dispatch<React.SetStateAction<Card[]>>;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlayerIndex: React.Dispatch<React.SetStateAction<number>>;
  shuffleDeck: (deck: Card[], playedCards: Card[]) => Card[];
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
  const [isClockwise, setIsClockwise] = useState(true);
  const [playedCards, setPlayedCards] = useState<Card[]>([]); // Oyuncu sırası yönü

  const shuffleDeck = (deck: Card[], playedCards: Card[]): Card[] => {
    if (deck.length === 0 && playedCards.length > 0) {
      // Eski oynanan kartları yeni deste olarak kullan
      const reshuffledDeck = [...playedCards];
      playedCards.length = 0; // Oynanan kartları sıfırla

      // Kartları karıştır
      for (let i = reshuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [reshuffledDeck[i], reshuffledDeck[j]] = [
          reshuffledDeck[j],
          reshuffledDeck[i],
        ];
      }

      return reshuffledDeck;
    }

    // Eğer deste zaten doluysa, desteyi karıştır
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
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
    updatedDeck = shuffleDeck(updatedDeck, playedCards); // `playedCards` parametresini ekleyin

    return { deck: updatedDeck, players: updatedPlayers };
  };

  const drawCardsForNextPlayer = (
    currentPlayerId: number,
    numCards: number
  ) => {
    // Mevcut oyuncuyu bul
    const currentPlayerIndex = players.findIndex(
      (p) => p.id === currentPlayerId
    );
    if (currentPlayerIndex === -1) return;

    // Bir sonraki oyuncuyu belirle
    const nextPlayerIndex = isClockwise
      ? (currentPlayerIndex + 1) % players.length
      : (currentPlayerIndex - 1 + players.length) % players.length;

    const nextPlayer = players[nextPlayerIndex];
    if (!nextPlayer) return;

    const updatedCurrentPlayer = {
      ...players[currentPlayerIndex],
      hand: players[currentPlayerIndex].hand.filter(
        (card) => card.id !== currentCard.id // currentCard.id ile eşleşmeyen kartları elinde tut
      ),
    };
    // Çekilecek kartları belirle
    const cardsToDraw = deck.slice(0, numCards);
    const updatedDeck = deck.slice(numCards);

    // Bir sonraki oyuncunun elini güncelle
    const updatedNextPlayer = {
      ...nextPlayer,
      hand: [...nextPlayer.hand, ...cardsToDraw],
    };

    // Oyuncu listesini güncelle
    const updatedPlayers = players.map((p, index) => {
      if (index === currentPlayerIndex) return updatedCurrentPlayer;
      if (index === nextPlayerIndex) return updatedNextPlayer;
      return p;
    });

    for (let i = 0; i < numCards; i++) {
      const drawnCard = deck.shift();
      if (drawnCard) {
        nextPlayer.hand.push(drawnCard);
      }
    }
    // Güncellenmiş oyuncuları ve desteyi ayarla
    setPlayers(updatedPlayers);
    setDeck(updatedDeck);

    // Eğer destede yeterince kart kalmadıysa, desteyi yeniden karıştır
    if (updatedDeck.length < numCards) {
      const reshuffledDeck = shuffleDeck(updatedDeck, playedCards);
      setDeck(reshuffledDeck);
    }
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

    // 2. Özel kartlar için işlem yap
    if (card.value === "Wild+4") {
      drawCardsForNextPlayer(playerId, 4);
      setShowColorPopup(true);
      playerIndexWithClockwise(isClockwise);
    } else if (card.value === "Wild") {
      setShowColorPopup(true);
    } else if (card.value === "+2") {
      drawCardsForNextPlayer(playerId, 2);
      playerIndexWithClockwise(isClockwise);
    } else if (card.value === "Skip") {
      playerIndexWithClockwise(isClockwise);
    } else if (card.value === "Reverse") {
      setIsClockwise((prev) => !prev);

      // Oyuncu dizinini doğru şekilde güncelle
      setCurrentPlayerIndex((prevIndex) => {
        const newIndex = (prevIndex - 2 + players.length) % players.length;
        return newIndex;
      });
    }
    const updatedHand = player.hand.filter((c) => c.id !== card.id);

    const updatedPlayers = players.map((p) =>
      p.id === playerId ? { ...p, hand: updatedHand } : p
    );

    setPlayers(updatedPlayers);
    // 3. UNO kontrolü
    if (checkUNO(player)) {
      alert(`${player.name} UNO dedi!`);
    }

    // 4. Oyunu kazananı kontrol et
    if (updatedHand.length === 0) {
      alert(`${player.name} kazandı!`);
      setGameOver(true);
      return;
    }

    // 5. Güncel kartı ayarla ve sonraki oyuncuya geç
    setPlayedCards((prev) => [...prev, currentCard]);
    setCurrentCard(card);
    setCurrentPlayerIndex((prevIndex) =>
      isClockwise
        ? (prevIndex + 1) % players.length
        : (prevIndex - 1 + players.length) % players.length
    );
  };
  const playerIndexWithClockwise = (isClockwise: boolean) => {
    if (isClockwise) {
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    } else {
      setCurrentPlayerIndex((prevIndex) => (prevIndex - 1) % players.length);
    }
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
        playedCards,
        setPlayedCards,
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
