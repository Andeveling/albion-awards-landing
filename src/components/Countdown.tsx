import { LAUNCH_DATE } from "../config/constants";
import { useCountdown } from "../hooks/useCountdown";
import { formatDate } from "../utils/format";
import { CountdownDisplay } from "./CountdownDisplay";

/**
 * Main countdown component that manages state and displays countdown or expired message
 */
export function Countdown() {
  const { timeLeft, isExpired } = useCountdown();

  if (isExpired) {
    return (
      <div className="hero min-h-[50vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-4">
              ¡Las votaciones ya están abiertas!
            </h1>
            <p className="text-xl">Participa ahora en los Albion Awards 2025</p>
            <button className="btn btn-primary mt-6">Ir a votar</button>
          </div>
        </div>
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className="hero min-h-[50vh] bg-base-200">
        <div className="hero-content text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-dvh bg-linear-to-br from-base-300 to-base-200">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Albion Awards 2025
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-80">
            Las votaciones comienzan el {formatDate(new Date(LAUNCH_DATE))}
          </p>

          <div className="card bg-base-100 shadow-xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Tiempo restante
            </h2>
            <CountdownDisplay timeLeft={timeLeft} />
          </div>

          <p className="mt-8 text-sm md:text-base opacity-70">
            Prepárate para votar por tus streamers y momentos favoritos
          </p>
        </div>
      </div>
    </div>
  );
}
