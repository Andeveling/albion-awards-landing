import type { TimeLeft } from '../types/countdown'
import { formatTimeLeft, shouldShowDays } from '../utils/format'

interface CountdownDisplayProps {
  timeLeft: TimeLeft
}

/**
 * Displays the countdown timer using DaisyUI countdown component
 */
export function CountdownDisplay({ timeLeft }: CountdownDisplayProps) {
  const formatted = formatTimeLeft(timeLeft)
  const showDays = shouldShowDays(timeLeft)

  return (
    <div className="flex justify-center items-center gap-4">
      {showDays && (
        <div className="flex flex-col items-center">
          <span className="countdown font-mono text-5xl md:text-7xl">
            <span style={{ '--value': formatted.days } as React.CSSProperties}></span>
          </span>
          <span className="text-sm md:text-base opacity-70">días</span>
        </div>
      )}

      <div className="flex flex-col items-center">
        <span className="countdown font-mono text-5xl md:text-7xl">
          <span style={{ '--value': formatted.hours } as React.CSSProperties}></span>
        </span>
        <span className="text-sm md:text-base opacity-70">horas</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="countdown font-mono text-5xl md:text-7xl">
          <span style={{ '--value': formatted.minutes } as React.CSSProperties}></span>
        </span>
        <span className="text-sm md:text-base opacity-70">minutos</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="countdown font-mono text-5xl md:text-7xl">
          <span style={{ '--value': formatted.seconds } as React.CSSProperties}></span>
        </span>
        <span className="text-sm md:text-base opacity-70">segundos</span>
      </div>
    </div>
  )
}
