// src/components/bot.tsx

import { Player } from "./players";  // Oyuncu tipini içeri aktar
import { Card } from "./cards";      // Kart tipini içeri aktar

// Botun oynayabileceği kartları bulma
const getPlayableCards = (player: Player, lastCard: Card): Card[] => {
  return player.hand.filter(
    (card) => 
      card.color === lastCard.color || 
      card.value === lastCard.value || 
      card.color === null // Joker kartlar
  );
};

// Botun oynayacağı kartı seçme (Basit strateji: En düşük değeri seçme)
const botPlayCard = (bot: Player, lastCard: Card): Card | null => {
  const playableCards = getPlayableCards(bot, lastCard);

  if (playableCards.length > 0) {
    return playableCards.sort((a, b) => {
      if (typeof a.value === 'number' && typeof b.value === 'number') {
        return a.value - b.value;
      }
      return 0;
    })[0];  // En düşük değeri seç
  }
  
  return null;  // Oynanabilir kart yoksa null dön
};

// Botun kart çekme davranışını simüle etme
const botDrawCard = (bot: Player, deck: Card[]): void => {
  const drawnCard = deck.shift();
  if (drawnCard) {
    bot.hand.push(drawnCard);  // Çekilen kartı botun eline ekle
  }
};

// Botun sıradaki turu oynamasını sağlayacak fonksiyon
export const botTurn = (bot: Player, lastCard: Card, deck: Card[], setDeck: React.Dispatch<React.SetStateAction<Card[]>>, setPlayers: React.Dispatch<React.SetStateAction<Player[]>>): void => {
  const cardToPlay = botPlayCard(bot, lastCard);
  
  if (cardToPlay) {
    console.log(`${bot.name} plays ${cardToPlay.value}`);
    // Kartı oynayalım
    bot.hand = bot.hand.filter((card) => card.id !== cardToPlay.id);
    lastCard = cardToPlay; // Oynanan kartı güncelle
  } else {
    console.log(`${bot.name} draws a card`);
    botDrawCard(bot, deck);  // Kart çekme
  }

  // Desteyi ve oyuncuları güncelle
  setDeck([...deck]);
  setPlayers((prevPlayers) => prevPlayers.map((player) => player.id === bot.id ? bot : player));
};
