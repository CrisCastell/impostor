import { useState } from 'react';
import type { Player } from '../types';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';

interface Props {
  players: Player[];
  secretWord: string | null;
  impostorIds: string[];
  currentRevealIndex: number;
  onNextReveal: () => void;
  onBackToLobby: () => void;
  onNewRound: () => void;
}

type PendingAction = null | 'newRound' | 'editPlayers';

export function RevealScreen({
  players,
  secretWord,
  impostorIds,
  currentRevealIndex,
  onNextReveal,
  onBackToLobby,
  onNewRound,
}: Props) {
  const [showWord, setShowWord] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const isDone = currentRevealIndex >= players.length;
  const player = players[currentRevealIndex];
  const impostorPlayers = players.filter((p) => impostorIds.includes(p.id));

  const handleMainTap = () => {
    if (isDone) return;

    if (!showWord) {
      setShowWord(true);
    } else {
      setShowWord(false);
      onNextReveal();
    }
  };

  const requestNewRound = () => setPendingAction('newRound');
  const requestEditPlayers = () => setPendingAction('editPlayers');
  const cancelPendingAction = () => setPendingAction(null);

  const confirmPendingAction = () => {
    if (pendingAction === 'newRound') {
      onNewRound();
    } else if (pendingAction === 'editPlayers') {
      onBackToLobby();
    }
    setPendingAction(null);
  };

  if (!secretWord || impostorIds.length === 0) {
    return (
      <ScreenContainer title="Error">
        <p className="text">Ronda configurada incorrectamente.</p>
        <PrimaryButton onClick={onBackToLobby}>Volver al lobby</PrimaryButton>
      </ScreenContainer>
    );
  }

  if (isDone) {
    return (
      <ScreenContainer title="¡Todos listos!">
        <p className="text">
          Todos los jugadores ya tienen su palabra. Ahora discutan y traten de
          encontrar al impostor.
        </p>

        <div className="btn-group">
          <PrimaryButton onClick={requestNewRound}>Nueva ronda</PrimaryButton>
          <button className="btn-secondary" onClick={requestEditPlayers}>
            Editar jugadores
          </button>
        </div>

        {/* Diálogo de confirmación */}
        {pendingAction && (
          <div className="modal-overlay">
            <div className="modal-card">
              <h2 className="modal-title">
                {pendingAction === 'newRound'
                  ? '¿Empezar una nueva ronda?'
                  : '¿Volver a editar los jugadores?'}
              </h2>

              <p className="text">
                Antes de continuar, {impostorIds.length === 1 ? 'el impostor' : 'los impostores'} en esta ronda {impostorIds.length === 1 ? 'fue' : 'fueron'}:
              </p>

              {impostorPlayers.length > 0 ? (
                <div>
                  {impostorPlayers.map((impostor) => (
                    <p key={impostor.id} className="impostor-name">
                      {impostor.name}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text">No se pudo determinar {impostorIds.length === 1 ? 'el impostor' : 'los impostores'}.</p>
              )}

              <p className="text text-small">
                Al confirmar, se reiniciará la ronda o volverás al lobby según
                la opción elegida.
              </p>

              <div className="modal-actions">
                <button className="btn-secondary" onClick={cancelPendingAction}>
                  Cancelar
                </button>
                <PrimaryButton onClick={confirmPendingAction}>
                  Confirmar
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </ScreenContainer>
    );
  }

  const isImpostor = impostorIds.includes(player.id);
  const wordToShow = isImpostor ? 'IMPOSTOR' : secretWord;

  return (
    <ScreenContainer title="Pass the phone">
      {!showWord ? (
        <div className="center-card" onClick={handleMainTap}>
          <p className="text-large">Entregá el teléfono a:</p>
          <p className="player-name">{player.name}</p>
          <p className="tap-text">Tocá para ver tu palabra</p>
        </div>
      ) : (
        <div className="center-card" onClick={handleMainTap}>
          <p className="text-large">Tu palabra es:</p>
          <p className="secret-word">{wordToShow}</p>
          <p className="tap-text">
            Tocá y pasá el celular al siguiente jugador
          </p>
        </div>
      )}
    </ScreenContainer>
  );
}
