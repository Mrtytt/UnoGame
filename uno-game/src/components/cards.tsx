const shuffleDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Kartları yer değiştir
  }
  return deck;
};

export type Card = {
  id: string; // Her kart için benzersiz bir ID
  color: string | null; // null joker kartlar için
  value: string | number;
};

const colors = ["red", "blue", "green", "yellow"];
const specialCards = ["+2", "reverse", "skip"];
const wildCards = ["wild", "wild+4"];

export const createDeck = (): Card[] => {
  let deck: Card[] = [];
  let cardId = 1;

  // Sayı kartlarını ekle
  colors.forEach((color) => {
    for (let i = 0; i <= 9; i++) {
      deck.push({ id: `card-${cardId++}`, color, value: i });
    }
    specialCards.forEach((card) => {
      deck.push({ id: `card-${cardId++}`, color, value: card });
    });
  });

  // Joker kartlar
  wildCards.forEach((card) => {
    for (let i = 0; i < 4; i++) {
      deck.push({ id: `card-${cardId++}`, color: null, value: card });
    }
  });

  return shuffleDeck(deck); // Desteyi karıştırıyoruz
};

// Oyunculara kartları dağıtmak için
export const dealCards = (deck: Card[], numPlayers: number): Card[][] => {
  const playerHands: Card[][] = [];
  for (let i = 0; i < numPlayers; i++) {
    playerHands.push(deck.slice(i * 7, (i + 1) * 7)); // Her oyuncuya 7 kart dağıtıyoruz
  }
  return playerHands;
};
