/**
 * Application configuration constants
 */

// Launch date configuration
export const LAUNCH_DATE = import.meta.env.VITE_LAUNCH_DATE || '2025-11-24T00:00:00-05:00'
export const TIMEZONE = import.meta.env.VITE_TIMEZONE || 'America/Bogota'

// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// Social media URLs
export const TWITTER_URL = import.meta.env.VITE_TWITTER_URL || 'https://twitter.com/kuruogg'
export const DISCORD_URL = import.meta.env.VITE_DISCORD_URL || 'https://discord.gg/albion'

// Event information
export const EVENT_TITLE = 'Albion Awards 2025'
export const EVENT_DESCRIPTION = 'Evento comunitario de premiación donde los jugadores y espectadores de Albion Online votan por los mejores streamers, creadores de contenido y momentos del año'

// Organizers
export const ORGANIZERS = [
  {
    name: 'kuruogg',
    url: 'https://www.twitch.tv/kuruogg',
    platform: 'Twitch'
  },
  {
    name: 'andeveling',
    url: 'https://andeveling.vercel.app/',
    platform: 'Portfolio'
  }
]

// Disclaimer
export const DISCLAIMER = 'Evento no oficial organizado por la comunidad'
