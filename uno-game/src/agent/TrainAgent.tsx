import React, { useState, useEffect } from "react";
import { useGameContext } from "../context/GameContext";
import { Card } from "../components/cards";
import { Player } from "../components/players";

// Ajanın öğrenmesi için basit bir strateji tipi
type Strategy = (player: Player, currentCard: Card | null, deck: Card[]) => Card | null;

// Eğitim simülasyonu için bir bileşen
const TrainAgent: React.FC = () => {
  const {
    players,
    deck,
    currentCard,
    setDeck,
    setPlayers,
    playTurn,
    playCard,
    shuffleDeck,
    dealCardsOneByOne,
    playedCards,
  } = useGameContext();

  const [agent, setAgent] = useState<Player | null>(null);
  const [trainingLog, setTrainingLog] = useState<string[]>([]);

  // Basit bir ajan stratejisi
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

  // Ajanı başlat ve oyuna hazırla
  // useEffect(() => {
  //   const initializeAgent = async () => {
  //     // Oyuncular ve deste hazırla
  //     const shuffledDeck = shuffleDeck([...deck],playedCards);
  //     const initializedPlayers = [
  //       { id: 1, name: "Agent", hand: [], isBot: true },
  //       { id: 2, name: "Opponent", hand: [], isBot: true },
  //     ];

  //     const { deck: newDeck, players: newPlayers } = await dealCardsOneByOne(
  //       shuffledDeck,
  //       initializedPlayers
  //     );

  //     setDeck(newDeck);
  //     setPlayers(newPlayers);
  //     setAgent(newPlayers[0]);
  //   };

  //   initializeAgent();
  // }, [deck, dealCardsOneByOne, setDeck, setPlayers, shuffleDeck]);

  // Eğitim döngüsü
  const trainAgent = () => {
    if (!agent) return;

    const agentIndex = players.findIndex((p) => p.id === agent.id);
    const currentPlayer = players[agentIndex];

    if (!currentPlayer) return;

    const chosenCard = simpleStrategy(currentPlayer, currentCard, deck);

    if (chosenCard) {
      playCard(agent.id, chosenCard);
      setTrainingLog((log) => [
        ...log,
        `${agent.name} played ${chosenCard.value} of ${chosenCard.color}`,
      ]);
    } else {
      setTrainingLog((log) => [
        ...log,
        `${agent.name} has no valid cards. Drawing a card...`,
      ]);
    }

    playTurn();
  };

  return (
    <div>
      <h1>Agent Training Simulation</h1>
      <button onClick={trainAgent}>Train Agent</button>
      <h2>Training Log</h2>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {trainingLog.map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>
    </div>
  );
};

export default TrainAgent;
