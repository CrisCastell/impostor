import { useState } from 'react';
import type { GameState, Category } from '../types';
import { WORDS } from '../data/words';


function pickRandom<T>(items: T[]): T {
  const idx = Math.floor(Math.random() * items.length);
  return items[idx];
}

function pickRandomMultiple<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    phase: 'intro',
    players: [],
    secretWord: null,
    impostorIds: [],
    categories: [],
    impostorCount: 1,
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

  const toggleCategory = (category: Category) => {
    setState(prev => {
      const isSelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category],
      };
    });
  };

  const setImpostorCount = (count: 1 | 2) => {
    setState(prev => ({
      ...prev,
      impostorCount: count,
    }));
  };

  const startRound = () => {
    setState(prev => {
      if (prev.players.length < 3) {
        console.warn('Need at least 3 players to start');
        return prev;
      }

      if (prev.categories.length === 0) {
        console.warn('At least one category must be selected before starting');
        return prev;
      }

      // Collect all words from selected categories
      const allWords: string[] = [];
      prev.categories.forEach(categoryLabel => {
        const category = WORDS.find(w => w.label === categoryLabel);
        if (category) {
          allWords.push(...category.words);
        }
      });

      if (allWords.length === 0) {
        console.warn('No words found for selected categories');
        return prev;
      }

      const secretWord = pickRandom(allWords);
      
      // Select 1 or 2 impostors based on impostorCount
      const impostorIds = pickRandomMultiple(
        prev.players.map(p => p.id),
        Math.min(prev.impostorCount, prev.players.length)
      );

      return {
        ...prev,
        phase: 'reveal',
        secretWord,
        impostorIds,
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
      impostorIds: [],
      currentRevealIndex: 0,
    }));
  };

  const resetGame = () => {
    setState({
      phase: 'intro',
      players: [],
      secretWord: null,
      impostorIds: [],
      categories: [],
      impostorCount: 1,
      currentRevealIndex: 0,
    });
  };

  return {
    state,
    goToLobby,
    addPlayer,
    removePlayer,
    resetPlayers,
    toggleCategory,
    setImpostorCount,
    startRound,
    nextReveal,
    backToLobby,
    resetGame,
  };
}
