import { useState } from 'react';
import type { GameState } from '../types';
import { WORDS } from '../data/words';


function pickRandom<T>(items: T[]): T {
  const idx = Math.floor(Math.random() * items.length);
  return items[idx];
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    phase: 'intro',
    players: [],
    secretWord: null,
    impostorId: null,
    currentRevealIndex: 0,
  });

  const goToLobby = () => {
    setState(prev => ({
      ...prev,
      phase: 'lobby',
    }));
  };

  const addPlayer = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setState(prev => ({
      ...prev,
      players: [
        ...prev.players,
        { id: crypto.randomUUID(), name: trimmed },
      ],
    }));
  };

  const removePlayer = (id: string) => {
    setState(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== id),
    }));
  };

  const resetPlayers = () => {
    setState(prev => ({
      ...prev,
      players: [],
    }));
  };

  const startRound = () => {
    setState(prev => {
      if (prev.players.length < 3) {
        // as a safety guard – you can surface this in UI if needed
        console.warn('Need at least 3 players to start');
        return prev;
      }

      const secretWord = pickRandom(WORDS);
      const impostorIndex = Math.floor(Math.random() * prev.players.length);
      const impostorId = prev.players[impostorIndex].id;

      return {
        ...prev,
        phase: 'reveal',
        secretWord,
        impostorId,
        currentRevealIndex: 0,
      };
    });
  };

  const nextReveal = () => {
    setState(prev => {
      const nextIndex = prev.currentRevealIndex + 1;
      if (nextIndex >= prev.players.length) {
        return { ...prev, currentRevealIndex: nextIndex };
      }
      return { ...prev, currentRevealIndex: nextIndex };
    });
  };

  const backToLobby = () => {
    setState(prev => ({
      ...prev,
      phase: 'lobby',
      secretWord: null,
      impostorId: null,
      currentRevealIndex: 0,
    }));
  };

  const resetGame = () => {
    setState({
      phase: 'intro',
      players: [],
      secretWord: null,
      impostorId: null,
      currentRevealIndex: 0,
    });
  };

  return {
    state,
    goToLobby,
    addPlayer,
    removePlayer,
    resetPlayers,
    startRound,
    nextReveal,
    backToLobby,
    resetGame,
  };
}
