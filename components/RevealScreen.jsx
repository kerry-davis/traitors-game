
import React, { useState, useEffect } from 'react';
import { Role } from '../types.js';
import PlayerIcon from './icons/PlayerIcon.jsx';
import TraitorIcon from './icons/TraitorIcon.jsx';
import FaithfulIcon from './icons/FaithfulIcon.jsx';

const RevealScreen = ({ currentPlayer, secretWord, onNextPlayer }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMasked, setIsMasked] = useState(true);

  useEffect(() => {
    setIsRevealed(false);
    setIsMasked(true);
  }, [currentPlayer]);

  const handleReveal = () => {
    setIsMasked(false);
    setTimeout(() => setIsRevealed(true), 100); // short delay for transition
  };
  
  const handleNext = () => {
    setIsRevealed(false);
    setTimeout(() => {
      onNextPlayer();
    }, 500); // Wait for fade out transition
  };

  const isTraitor = currentPlayer.role === Role.TRAITOR;

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-8 flex flex-col items-center justify-center text-center h-full">
      <div 
        className={`relative w-full aspect-square flex flex-col items-center justify-center p-6 rounded-3xl shadow-2xl transition-all duration-500 ${
          isRevealed 
            ? (isTraitor ? 'bg-red-900/50 border-red-500' : 'bg-sky-900/50 border-sky-500') 
            : 'bg-slate-800 border-slate-700'
        } border-2`}
      >
        {/* Masked View */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${isMasked ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <PlayerIcon className="w-24 h-24 text-slate-500" />
            <h2 className="text-4xl font-bold text-slate-200 mt-4">Player {currentPlayer.id}</h2>
            <p className="text-slate-400 mt-2">It's your turn.</p>
        </div>

        {/* Revealed View */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {isTraitor ? (
                <TraitorIcon className="w-24 h-24 text-red-400" />
            ) : (
                <FaithfulIcon className="w-24 h-24 text-sky-400" />
            )}
            <h2 className={`text-5xl font-bold mt-4 ${isTraitor ? 'text-red-300' : 'text-sky-300'}`}>
                You are a {isTraitor ? 'TRAITOR' : 'FAITHFUL'}
            </h2>
            {!isTraitor && (
                <>
                    <p className="text-slate-300 mt-4 text-xl">The secret word is:</p>
                    <p className="text-4xl font-bold text-white tracking-widest uppercase bg-slate-700/50 px-4 py-2 rounded-lg mt-2">{secretWord}</p>
                </>
            )}
        </div>
      </div>
      
      <div className="w-full mt-8">
        {isRevealed ? (
            <button
                onClick={handleNext}
                className="w-full bg-slate-600 text-white font-bold py-4 px-4 rounded-lg text-xl hover:bg-slate-500 transition-all duration-300 transform hover:scale-105"
            >
                Hide & Pass
            </button>
        ) : (
            <button
                onClick={handleReveal}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold py-4 px-4 rounded-lg text-xl hover:from-cyan-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
            >
                Tap to Reveal Role
            </button>
        )}
      </div>
    </div>
  );
};

export default RevealScreen;