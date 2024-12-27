import { Card } from "./cards";

export type Player = {
  id: number;
  name: string;
  hand: Card[];
  playerPosition: "top" | "right" | "bottom" | "left"; // Oyuncunun masa üzerindeki konumu
  isBot: boolean; // Yeni özellik
};

export const createPlayers = (numBots: number): Player[] => {
  const positions = ["left", "top", "right", "bottom"] as const;

  const players: Player[] = [
    { id: 1, name: "Human", hand: [], playerPosition: "left", isBot: false }, // İnsan oyuncu
  ];

  for (let i = 0; i < numBots; i++) {
    players.push({
      id: i + 2,
      name: `Bot ${i + 1}`,
      hand: [],
      playerPosition: positions[i + 1], // Pozisyonları sırayla ata
      isBot: true,
    });
  }

  return players;
};
