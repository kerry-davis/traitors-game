import React, { useState } from 'react';
import { GameStage, Player, Role } from './types';
import { fetchSecretWord } from './services/geminiService';
import SetupScreen from './components/SetupScreen';
import RevealScreen from './components/RevealScreen';
import DiscussionScreen from './components/DiscussionScreen';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.SETUP);
  const [playerCount, setPlayerCount] = useState(3);
  const [traitorCount, setTraitorCount] = useState(1);
  const [players, setPlayers] = useState<Player[]>([]);
  const [secretWord, setSecretWord] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [startingPlayer, setStartingPlayer] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleStartGame = async () => {
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (traitorCount >= playerCount) {
        setError("There must be fewer traitors than players.");
        setIsLoading(false);
        return;
    }

    try {
      const word = await fetchSecretWord();
      setSecretWord(word);

      const roles: Role[] = Array(traitorCount).fill(Role.TRAITOR)
        .concat(Array(playerCount - traitorCount).fill(Role.FAITHFUL));
      const shuffledRoles = shuffleArray(roles);

      const newPlayers: Player[] = shuffledRoles.map((role, index) => ({
        id: index + 1,
        role,
      }));
      
      setPlayers(newPlayers);
      setCurrentPlayerIndex(0);
      setGameStage(GameStage.REVEALING);
    } catch (e) {
      setError('Failed to start the game. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
    } else {
      const startPlayerId = Math.floor(Math.random() * players.length) + 1;
      setStartingPlayer(startPlayerId);
      setGameStage(GameStage.DISCUSSION);
    }
  };
  
  const handleRevealTraitors = () => {
    setGameStage(GameStage.END);
  };

  const handleNewGame = () => {
    setGameStage(GameStage.SETUP);
    setPlayers([]);
    setSecretWord('');
    setCurrentPlayerIndex(0);
    setStartingPlayer(null);
    setError(null);
    // Reset to defaults
    setPlayerCount(3);
    setTraitorCount(1);
  };

  const renderGameStage = () => {
    switch (gameStage) {
      case GameStage.REVEALING:
        return (
          <RevealScreen
            currentPlayer={players[currentPlayerIndex]}
            secretWord={secretWord}
            onNextPlayer={handleNextPlayer}
          />
        );
      case GameStage.DISCUSSION:
        return (
          <DiscussionScreen
            startingPlayer={startingPlayer!}
            onRevealTraitors={handleRevealTraitors}
          />
        );
      case GameStage.END:
        return <EndScreen players={players} onNewGame={handleNewGame} />;
      case GameStage.SETUP:
      default:
        return (
          <SetupScreen
            playerCount={playerCount}
            setPlayerCount={setPlayerCount}
            traitorCount={traitorCount}
            setTraitorCount={setTraitorCount}
            onStart={handleStartGame}
            isLoading={isLoading}
            error={error}
          />
        );
    }
  };

  return (
    <main className="bg-slate-900 text-slate-100 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full h-full flex items-center justify-center">
        {renderGameStage()}
      </div>
    </main>
  );
};

export default App;