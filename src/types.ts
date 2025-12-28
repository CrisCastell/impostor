export type GamePhase = 'intro' | 'lobby' | 'reveal';

export interface Player {
  id: string;
  name: string;
}

export type Category = 'geografia' | 'lugares' | 'cultura_argentina' | 'cultura pop (personajes)' | 'cultura ficticios' | 'objetos';

export interface GameState {
  phase: GamePhase;
  players: Player[];
  secretWord: string | null;
  impostorIds: string[]; // Array to support multiple impostors
  categories: Category[]; // Array to support multiple categories
  impostorCount: 1 | 2; // Number of impostors
  currentRevealIndex: number; // index of player seeing the phone
}
