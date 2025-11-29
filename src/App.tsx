import { IntroScreen } from './screens/IntroScreen';
import { LobbyScreen } from './screens/LobbyScreen';
import { RevealScreen } from './screens/RevealScreen';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    state,
    goToLobby,
    addPlayer,
    removePlayer,
    startRound,
    nextReveal,
    backToLobby,
    resetGame,
  } = useGameState();

  const { phase, players, secretWord, impostorId, currentRevealIndex } = state;

  if (phase === 'intro') {
    return <IntroScreen onStart={goToLobby} />;
  }

  if (phase === 'lobby') {
    return (
      <LobbyScreen
        players={players}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
        onStartRound={startRound}
      />
    );
  }

  if (phase === 'reveal') {
    return (
      <RevealScreen
        players={players}
        secretWord={secretWord}
        impostorId={impostorId}
        currentRevealIndex={currentRevealIndex}
        onNextReveal={nextReveal}
        onBackToLobby={backToLobby}
        onNewRound={startRound}
      />
    );
  }

  return (
    <div>
      <p>Frase desconocida</p>
      <button onClick={resetGame}>Reiniciar juego</button>
    </div>
  );
}

export default App;
