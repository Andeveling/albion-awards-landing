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
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/bg-albion.webp)' }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <div className="max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-black uppercase text-white drop-shadow-2xl md:text-7xl">
              ¡Las votaciones{" "}
              <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                ya están abiertas!
              </span>
            </h1>
            <p className="mb-8 text-xl text-gray-300 md:text-2xl">
              Participa ahora en los Albion Awards 2025
            </p>
            <button className="btn btn-primary btn-lg rounded-full px-12 text-lg font-bold uppercase shadow-2xl transition-transform hover:scale-105">
              Ir a votar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/bg-albion.webp)' }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black/90" />
        </div>

        {/* Loading Spinner */}
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg text-cyan-400"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/bg-albion.webp)' }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Main Title */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-6xl font-black uppercase tracking-tight text-white drop-shadow-2xl md:text-8xl lg:text-9xl">
              <span className="bg-linear-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Albion
              </span>
              {" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Awards
              </span>
            </h1>
            <div className="mb-6 text-4xl font-bold text-cyan-400 md:text-6xl">
              2025
            </div>
            <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
              Las votaciones comienzan el{" "}
              <span className="font-semibold text-amber-400">
                {formatDate(new Date(LAUNCH_DATE))}
              </span>
            </p>
          </div>

          {/* Glassmorphism Card */}
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-black/40 p-8 shadow-2xl backdrop-blur-xl md:p-12">
            <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
              Tiempo restante
            </h2>
            <CountdownDisplay timeLeft={timeLeft} />

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-300 md:text-xl">
                Prepárate para votar por tus{" "}
                <span className="font-bold text-amber-400">streamers</span> y{" "}
                <span className="font-bold text-cyan-400">momentos</span> favoritos
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-center gap-4">
            <div className="h-1 w-20 rounded-full bg-linear-to-r from-amber-400 to-orange-500" />
            <div className="h-1 w-20 rounded-full bg-linear-to-r from-cyan-400 to-blue-500" />
            <div className="h-1 w-20 rounded-full bg-linear-to-r from-purple-500 to-pink-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
