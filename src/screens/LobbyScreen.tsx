import type { FormEvent} from 'react';
import { useState } from 'react';
import type { Player } from '../types';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';

interface Props {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  onStartRound: () => void;
}

export function LobbyScreen({
  players,
  onAddPlayer,
  onRemovePlayer,
  onStartRound,
}: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddPlayer(name);
    setName('');
  };

  const canStart = players.length >= 3;

  return (
    <ScreenContainer title="Jugadores">
      <form className="form-row" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Nombre de jugador"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <PrimaryButton type="submit" disabled={!name.trim()}>
          Agregar +
        </PrimaryButton>
      </form>

      {players.length === 0 ? (
        <p className="text">Sin jugadores aun. Agregar al menos 3 jugadores.</p>
      ) : (
        <ul className="player-list">
          {players.map(player => (
            <li key={player.id} className="player-item">
              <span>{player.name}</span>
              <button
                className="btn-link"
                type="button"
                onClick={() => onRemovePlayer(player.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <PrimaryButton
        onClick={onStartRound}
        disabled={!canStart}
        title={!canStart ? 'Need at least 3 players' : undefined}
      >
        Iniciar ronda
      </PrimaryButton>
    </ScreenContainer>
  );
}
