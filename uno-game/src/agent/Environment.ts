// environment.ts

import { Card } from "../components/cards";
import { Player } from "../components/players";

export interface GameState {
  deck: Card[];
  players: Player[];
  currentCard: Card | null;
  currentPlayerIndex: number;
}

export type Strategy = (
  player: Player,
  currentCard: Card | null,
  deck: Card[]
) => Card | null;

export interface GameActions {
  shuffleDeck: (deck: Card[]) => Card[];
  dealCardsOneByOne: (
    deck: Card[],
    players: Player[]
  ) => Promise<{ deck: Card[]; players: Player[] }>;
  playTurn: () => void;
  playCard: (playerId: number, card: Card) => void;
  setDeck: (deck: Card[]) => void;
  setPlayers: (players: Player[]) => void;
}

export interface TrainingEnvironment {
  gameState: GameState;
  actions: GameActions;
  strategy: Strategy;
}

export const createEnvironment = (
  gameState: GameState,
  actions: GameActions
): TrainingEnvironment => {
  const simpleStrategy: Strategy = (player, currentCard, deck) => {
    const validCards = player.hand.filter(
      (card) =>
        currentCard &&
        (card.color === currentCard.color ||
          card.value === currentCard.value ||
          card.color === null)
    );
    return validCards.length > 0 ? validCards[0] : null;
  };

  return {
    gameState,
    actions,
    strategy: simpleStrategy,
  };
};
