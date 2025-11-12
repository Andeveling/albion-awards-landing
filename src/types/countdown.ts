/**
 * Represents the time remaining until a target date
 */
export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * State of the countdown timer
 */
export interface CountdownState {
  targetDate: Date
  timeLeft: TimeLeft | null
  isExpired: boolean
}
