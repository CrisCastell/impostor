import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';

interface Props {
  onStart: () => void;
}

export function IntroScreen({ onStart }: Props) {
  return (
    <ScreenContainer title="Impostor">
      <p className="text">
        Todos los jugadores reciben la misma palabra,
        excepto… el IMPOSTOR 👀
      </p>
      <p className="text">
        Agrega jugadores, luego pasa el celu a cada jugador.
      </p>
      <PrimaryButton onClick={onStart}>Ir al lobby</PrimaryButton>
    </ScreenContainer>
  );
}
