import { Card } from "./cards";

export type Player = {
  id: number;
  name: string;
  hand: Card[];
  isBot: boolean; // Yeni özellik
};

export const createPlayers = (numBots: number): Player[] => {
  const players: Player[] = [
    { id: 1, name: "Human", hand: [], isBot: false }, // İnsan oyuncu
  ];

  for (let i = 0; i < numBots; i++) {
    players.push({ id: i + 2, name: `Bot ${i + 1}`, hand: [], isBot: true });
  }

  return players;
};
