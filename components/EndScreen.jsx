import React from 'react';
import { Role } from '../types.js';
import TraitorIcon from './icons/TraitorIcon.jsx';

const EndScreen = ({ players, onNewGame }) => {
  const traitors = players.filter(p => p.role === Role.TRAITOR);

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-slate-800 rounded-2xl shadow-2xl flex flex-col items-center text-center">
      <TraitorIcon className="w-24 h-24 text-red-400" />
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mt-6 mb-4">
        Game Over
      </h1>

      <div className="mb-8 w-full">
        <h2 className="text-2xl text-red-300 font-semibold mb-3">
          {traitors.length > 1 ? 'The Traitors Were' : 'The Traitor Was'}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {traitors.map(traitor => (
            <div key={traitor.id} className="bg-red-900/50 border-2 border-red-500 rounded-lg px-6 py-3">
              <p className="text-xl font-bold text-white">Player {traitor.id}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNewGame}
        className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold py-4 px-4 rounded-lg text-xl hover:from-cyan-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
};

export default EndScreen;