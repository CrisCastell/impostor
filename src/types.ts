export type GamePhase = 'intro' | 'lobby' | 'reveal';

export interface Player {
  id: string;
  name: string;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  secretWord: string | null;
  impostorId: string | null;
  currentRevealIndex: number; // index of player seeing the phone
}
