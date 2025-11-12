import React from 'react';
import PlayerIcon from './icons/PlayerIcon';

interface DiscussionScreenProps {
  onRevealTraitors: () => void;
  startingPlayer: number;
}

const DiscussionScreen: React.FC<DiscussionScreenProps> = ({ onRevealTraitors, startingPlayer }) => {
  return (
    <div className="w-full max-w-md mx-auto p-8 bg-slate-800 rounded-2xl shadow-2xl flex flex-col items-center text-center">
      <PlayerIcon className="w-24 h-24 text-teal-400" />
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mt-6 mb-4">
        All Roles Revealed
      </h1>
      <p className="text-slate-300 text-lg mb-2">
        Discuss, deceive, and deduce to find the traitors.
      </p>
      <p className="text-cyan-400 font-bold text-2xl mb-8">
        Player {startingPlayer} starts.
      </p>

      <button
        onClick={onRevealTraitors}
        className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold py-4 px-4 rounded-lg text-xl hover:from-red-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
      >
        Reveal Traitors
      </button>
    </div>
  );
};

export default DiscussionScreen;