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
    toggleCategory,
    setImpostorCount,
    startRound,
    nextReveal,
    backToLobby,
    resetGame,
  } = useGameState();

  const { phase, players, secretWord, impostorIds, currentRevealIndex } = state;

  if (phase === 'intro') {
    return <IntroScreen onStart={goToLobby} />;
  }

  if (phase === 'lobby') {
    return (
      <LobbyScreen
        players={players}
        selectedCategories={state.categories}
        impostorCount={state.impostorCount}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
        onToggleCategory={toggleCategory}
        onSetImpostorCount={setImpostorCount}
        onStartRound={startRound}
      />
    );
  }

  if (phase === 'reveal') {
    return (
      <RevealScreen
        players={players}
        secretWord={secretWord}
        impostorIds={impostorIds}
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
