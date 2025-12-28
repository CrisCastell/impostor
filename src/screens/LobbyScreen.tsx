import type { FormEvent} from 'react';
import { useState } from 'react';
import type { Player, Category } from '../types';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { WORDS } from '../data/words';

interface Props {
  players: Player[];
  selectedCategories: Category[];
  impostorCount: 1 | 2;
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  onToggleCategory: (category: Category) => void;
  onSetImpostorCount: (count: 1 | 2) => void;
  onStartRound: () => void;
}

export function LobbyScreen({
  players,
  selectedCategories,
  impostorCount,
  onAddPlayer,
  onRemovePlayer,
  onToggleCategory,
  onSetImpostorCount,
  onStartRound,
}: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddPlayer(name);
    setName('');
  };

  const canStart = players.length >= 3 && selectedCategories.length > 0;

  const categoryLabels: Record<string, string> = {
    'geografia': 'Geografía',
    'lugares': 'Lugares',
    'cultura_argentina': 'Cultura Argentina',
    'cultura pop (personajes)': 'Cultura Pop (Personajes)',
    'cultura ficticios': 'Cultura Ficticios',
    'objetos': 'Objetos',
  };

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

      {players.length >= 3 && (
        <div className="game-settings" style={{ marginTop: '1.5rem' }}>
          <div className="category-selection" style={{ marginBottom: '1.5rem' }}>
            <h3 className="text" style={{ marginBottom: '1rem' }}>
              Selecciona categorías (puedes elegir varias):
            </h3>
            <div className="category-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              {WORDS.map(category => {
                const isSelected = selectedCategories.includes(category.label as Category);
                return (
                  <button
                    key={category.label}
                    type="button"
                    onClick={() => onToggleCategory(category.label as Category)}
                    style={{
                      padding: '0.75rem 1rem',
                      border: isSelected ? '2px solid #007bff' : '1px solid #ccc',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#e7f3ff' : '#020617',
                      color: isSelected ? '#000' : '#e5e7eb',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: isSelected ? '600' : '400',
                      transition: 'all 0.2s',
                      position: 'relative',
                    }}
                  >
                    {categoryLabels[category.label] || category.label}
                    {isSelected && (
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        fontSize: '0.7rem',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="impostor-selection" style={{ marginBottom: '1.5rem' }}>
            <h3 className="text" style={{ marginBottom: '1rem' }}>
              Número de impostores:
            </h3>
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              justifyContent: 'center',
            }}>
              <button
                type="button"
                onClick={() => onSetImpostorCount(1)}
                style={{
                  padding: '0.75rem 2rem',
                  border: impostorCount === 1 ? '2px solid #007bff' : '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: impostorCount === 1 ? '#e7f3ff' : '#020617',
                  color: impostorCount === 1 ? '#000' : '#e5e7eb',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: impostorCount === 1 ? '600' : '400',
                  transition: 'all 0.2s',
                }}
              >
                1 Impostor
              </button>
              <button
                type="button"
                onClick={() => onSetImpostorCount(2)}
                style={{
                  padding: '0.75rem 2rem',
                  border: impostorCount === 2 ? '2px solid #007bff' : '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: impostorCount === 2 ? '#e7f3ff' : '#020617',
                  color: impostorCount === 2 ? '#000' : '#e5e7eb',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: impostorCount === 2 ? '600' : '400',
                  transition: 'all 0.2s',
                }}
              >
                2 Impostores
              </button>
            </div>
          </div>
        </div>
      )}

      <PrimaryButton
        onClick={onStartRound}
        disabled={!canStart}
        title={!canStart ? (players.length < 3 ? 'Se necesitan al menos 3 jugadores' : 'Selecciona al menos una categoría') : undefined}
      >
        Iniciar ronda
      </PrimaryButton>
    </ScreenContainer>
  );
}
