
import React from 'react';

interface SetupScreenProps {
  playerCount: number;
  setPlayerCount: (count: number) => void;
  traitorCount: number;
  setTraitorCount: (count: number) => void;
  onStart: () => void;
  isLoading: boolean;
  error: string | null;
}

const SetupScreen: React.FC<SetupScreenProps> = ({
  playerCount,
  setPlayerCount,
  traitorCount,
  setTraitorCount,
  onStart,
  isLoading,
  error,
}) => {
  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value) || 3;
    if (value < 3) value = 3;
    setPlayerCount(value);
    if (traitorCount >= value) {
      setTraitorCount(value - 1);
    }
  };

  const handleTraitorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value) || 1;
    if (value < 1) value = 1;
    if (value > 3) value = 3;
    if (value >= playerCount) value = playerCount - 1;
    setTraitorCount(value);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-slate-800 rounded-2xl shadow-2xl flex flex-col items-center text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 mb-2">
        Traitors
      </h1>
      <p className="text-slate-400 mb-8">Uncover the traitors among you.</p>

      <div className="w-full space-y-6 mb-8">
        <div className="flex flex-col items-start">
          <label htmlFor="players" className="text-lg font-medium text-slate-200 mb-2">
            Number of Players
          </label>
          <input
            id="players"
            type="number"
            min="3"
            value={playerCount}
            onChange={handlePlayerChange}
            className="w-full bg-slate-700 text-white p-3 rounded-lg border-2 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 transition"
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="traitors" className="text-lg font-medium text-slate-200 mb-2">
            Number of Traitors
          </label>
          <input
            id="traitors"
            type="number"
            min="1"
            max="3"
            value={traitorCount}
            onChange={handleTraitorChange}
            className="w-full bg-slate-700 text-white p-3 rounded-lg border-2 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 transition"
            disabled={isLoading}
          />
        </div>
      </div>
      
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <button
        onClick={onStart}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold py-4 px-4 rounded-lg text-xl hover:from-cyan-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
      >
        {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Starting Game...
            </>
        ) : (
          'Start Game'
        )}
      </button>
    </div>
  );
};

export default SetupScreen;
