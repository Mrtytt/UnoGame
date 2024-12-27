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

      // +4 ve Wild kartlarının color bilgisini varsayılan hale getir
      reshuffledDeck.forEach((card) => {
        if (
          (card.value === "+4" || card.value === "Wild") &&
          card.color !== undefined
        ) {
          card.color = "default"; // Varsayılan renk (ör. "default" olarak belirledik)
        }
      });

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
    const currentPlayerIndex = players.findIndex((p) => p.id === currentPlayerId);
    if (currentPlayerIndex === -1) return;
  
    const nextPlayerIndex = isClockwise
      ? (currentPlayerIndex + 1) % players.length
      : (currentPlayerIndex - 1 + players.length) % players.length;
  
    const nextPlayer = players[nextPlayerIndex];
    if (!nextPlayer) return;
  
    // Çekilecek kartları belirle
    const cardsToDraw = deck.slice(0, numCards);
    let updatedDeck = deck.slice(numCards);
  
    // Mevcut oyuncunun elini güncelle
    const updatedCurrentPlayer = {
      ...players[currentPlayerIndex],
      hand: players[currentPlayerIndex].hand.filter(
        (card) => card.id !== currentCard.id // currentCard.id ile eşleşmeyen kartları elinde tut
      ),
    };
  
    setPlayers((prevPlayers) =>
      prevPlayers.map((p, index) =>
        index === currentPlayerIndex ? updatedCurrentPlayer : p
      )
    );
  
    setDeck(updatedDeck); // Desteyi güncelle
  
    // Eğer destede yeterince kart kalmadıysa, desteyi yeniden karıştır
    if (updatedDeck.length < numCards) {
      const reshuffledDeck = shuffleDeck(updatedDeck, playedCards);
      updatedDeck = reshuffledDeck;
      setDeck(reshuffledDeck);
    }
  
    // Animasyon fonksiyonu
    const animateCardToPlayer = (card: Card, delay: number) => {
      const animationElement = document.createElement("div");
      animationElement.className = "card-animation";
      addCSS();
  
      const startPosition = "translate(1050%, -450%)";
      animationElement.style.transform = startPosition;
      animationElement.style.transition = `transform 1.0s ease ${delay}ms`;
  
      document.body.appendChild(animationElement);
  
      setTimeout(() => {
        const transform = getCardTransform(nextPlayer.playerPosition);
        animationElement.style.transform = transform;
  
        setTimeout(() => {
          // Animasyon tamamlandıktan sonra bir sonraki oyuncuyu güncelle
          const drawnCard = updatedDeck.shift();
          if (drawnCard) {
            setPlayers((prevPlayers) =>
              prevPlayers.map((p, index) =>
                index === nextPlayerIndex
                  ? { ...p, hand: [...p.hand, drawnCard] }
                  : p
              )
            );
            setDeck(updatedDeck); // Güncellenmiş desteyi tekrar kaydet
          }
  
          document.body.removeChild(animationElement); // DOM'daki animasyon elementini kaldır
        }, 1000); // Animasyon süresi
      }, 10);
    };
  
    // Her kart için animasyonu başlat
    cardsToDraw.forEach((card, index) => {
      animateCardToPlayer(card, index * 200); // Her kart için 200ms gecikme
    });
  };
  
  

  const addCSS = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      .card-animation {
        position: absolute; /* Sayfa üzerinde serbest hareket etmesi için */
        width: 75px; /* Kartın boyutunu belirleyin */
        height: 100px; /* Kartın boyutunu belirleyin */
        background-image: url('/cardback.png');,
        background-size: contain; /* Resmi kartın boyutlarına uyacak şekilde ölçeklendir */
        background-repeat: no-repeat; /* Resmin tekrar etmesini engelle */
        display: flex;
        background-size: 100% 100%;
        transition: transform 2.0s ease; /* Animasyon geçişi */
      }
    `;
    document.head.appendChild(style);
  };
  // CSS'i eklemek için fonksiyonu çağırın

  const drawCard = (playerId: number) => {
    const player = players.find((p) => p.id === playerId + 1);
    if (!player || gameOver) return;

    const drawnCard = deck.shift();
    if (!drawnCard) return;

    // Kartın geçici animasyon stilini ayarla
    const animationElement = document.createElement("div");
    animationElement.className = "card-animation";
    addCSS();

    // Animasyonun başlangıç pozisyonunu destedeki kartın pozisyonu olarak ayarla
    const startPosition = "translate(1050%, -450%)"; // Başlangıç pozisyonu (kart destede, ortada)
    animationElement.style.transform = startPosition;
    animationElement.style.transition = "transform 1.0s ease";

    document.body.appendChild(animationElement);

    // Animasyonu ters yönde, oyuncunun pozisyonuna doğru başlat
    setTimeout(() => {
      const transform = getCardTransform(player.playerPosition); // Animasyonun hedefi oyuncunun pozisyonu
      animationElement.style.transform = transform;

      // Animasyon tamamlandıktan sonra kartı oyuncunun eline ekle
      setTimeout(() => {
        player.hand.push(drawnCard); // Kartı oyuncunun eline ekle
        setDeck([...deck]); // Yeni desteyi güncelle
        setPlayers([...players]); // Oyuncuları güncelle

        // Animasyon elementini kaldır
        document.body.removeChild(animationElement);
      }, 1000); // Animasyon süresi (0.5s)
    }, 10); // Başlangıç animasyonu için küçük bir gecikme (DOM'un elementi eklemesini beklemek için)
  };

  const getCardTransform = (position: "top" | "right" | "bottom" | "left") => {
    switch (position) {
      case "top":
        return "translate(1050%, -675%)"; // Yukarıya doğru
      case "right":
        return "translate(2100%, -450%)"; // Sağa doğru
      case "bottom":
        return "translate(1050%, 100%)"; // Aşağıya doğru
      case "left":
        return "translate(0%, -450%) "; // Sola doğru
      default:
        return "translate(-50%, -50%)";
    }
  };

  const playCard = (playerId: number, card: Card) => {
    const player = players.find((p) => p.id === playerId);
    if (!player) return;

    // Wild ve +4 kartlarının her durumda oynanabilmesi
    if (card.value === "Wild" || card.value === "+4") {
      return handleCardPlay(playerId, card);
    }

    // Diğer kartlar için currentCard'a göre kontrol
    if (
      currentCard &&
      (card.color === currentCard.color ||
        card.value === currentCard.value ||
        card.color === null)
    ) {
      return handleCardPlay(playerId, card);
    }
  };
  const checkUNO = (player: Player): boolean => {
    if (player.hand.length === 2) {
      console.log(`${player.name} says UNO!`);
      return true;
    }
    return false;
  };
  const handleCardPlay = (playerId: number, card: Card) => {
    const player = players.find((p) => p.id === playerId);
    if (!player) return;
    playedCards.push(card);

    // 2. Özel kartlar için işlem yap
    if (card.value === "+4") {
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
    const calculateRemainingPoints = (playerId: number): number => {
      let totalPoints = 0;
      players.forEach((player) => {
        // Eğer oyuncu, mevcut oyuncuysa (yani elindeki kartları hesaba katma)
        if (player.id !== playerId) {
          player.hand.forEach((card) => {
            totalPoints += card.points;
          });
        }
      });
      return totalPoints;
    };
    // 4. Oyunu kazananı kontrol et
    if (updatedHand.length === 0) {
      alert(`${player.name} kazandı!`);
      alert(`Kazanan puanı: ${calculateRemainingPoints(playerId)}`); // Kazanan puanını göster
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
