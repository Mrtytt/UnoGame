import { Player } from "../components/players"; // Oyuncu türünü kullanıyorsanız türü içe aktarın.

export const calculateRemainingPoints = (players: Player[], playerId: number): number => {
  let totalPoints = 0;
  players.forEach((player) => {
    if (player.id !== playerId) {
      player.hand.forEach((card) => {
        totalPoints += card.points;
      });
    }
  });
  return totalPoints;
};
