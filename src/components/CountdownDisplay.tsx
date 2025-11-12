import type { TimeLeft } from '../types/countdown'
import { formatTimeLeft, shouldShowDays } from '../utils/format'

interface CountdownDisplayProps {
  timeLeft: TimeLeft
}

/**
 * Displays the countdown timer with glassmorphism design
 */
export function CountdownDisplay({ timeLeft }: CountdownDisplayProps) {
  const formatted = formatTimeLeft(timeLeft)
  const showDays = shouldShowDays(timeLeft)

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {showDays && (
        <div className="group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-black/30 p-6 backdrop-blur-md transition-all hover:border-amber-400/50 hover:bg-black/40">
          <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative flex flex-col items-center gap-2">
            <span className="countdown font-mono text-5xl font-black text-amber-400 md:text-7xl">
              <span style={{ '--value': formatted.days } as React.CSSProperties}></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300/80 md:text-sm">
              días
            </span>
          </div>
        </div>
      )}

      <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-black/30 p-6 backdrop-blur-md transition-all hover:border-cyan-400/50 hover:bg-black/40">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative flex flex-col items-center gap-2">
          <span className="countdown font-mono text-5xl font-black text-cyan-400 md:text-7xl">
            <span style={{ '--value': formatted.hours } as React.CSSProperties}></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300/80 md:text-sm">
            horas
          </span>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-blue-500/30 bg-black/30 p-6 backdrop-blur-md transition-all hover:border-blue-400/50 hover:bg-black/40">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative flex flex-col items-center gap-2">
          <span className="countdown font-mono text-5xl font-black text-blue-400 md:text-7xl">
            <span style={{ '--value': formatted.minutes } as React.CSSProperties}></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300/80 md:text-sm">
            minutos
          </span>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-purple-500/30 bg-black/30 p-6 backdrop-blur-md transition-all hover:border-purple-400/50 hover:bg-black/40">
        <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative flex flex-col items-center gap-2">
          <span className="countdown font-mono text-5xl font-black text-purple-400 md:text-7xl">
            <span style={{ '--value': formatted.seconds } as React.CSSProperties}></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300/80 md:text-sm">
            segundos
          </span>
        </div>
      </div>
    </div>
  )
}
