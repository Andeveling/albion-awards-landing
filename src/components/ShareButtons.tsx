import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconBrandX,
  IconShare,
} from '@tabler/icons-react'
import { useState } from 'react'

interface ShareData {
  title: string
  text: string
  url: string
}

/**
 * Componente de botones para compartir en redes sociales
 * Usa Web Share API con fallback a URLs directas
 */
export function ShareButtons() {
  const [ isSharing, setIsSharing ] = useState(false)

  const shareData: ShareData = {
    title: 'Albion Awards 2025',
    text: '🏆 ¡Los primeros Albion Awards están llegando! Vota por tus streamers y creadores favoritos de Albion Online 🎮',
    url: window.location.href,
  }

  // Detectar si el navegador soporta Web Share API
  const canShare = typeof navigator.share !== 'undefined'

  /**
   * Compartir usando Web Share API (móvil)
   */
  const handleNativeShare = async () => {
    if (!canShare) return

    try {
      setIsSharing(true)
      await navigator.share(shareData)
    } catch (error) {
      // Usuario canceló el share o error
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error al compartir:', error)
      }
    } finally {
      setIsSharing(false)
    }
  }

  /**
   * Compartir en Twitter/X
   */
  const shareOnTwitter = () => {
    const tweetText = encodeURIComponent(shareData.text)
    const tweetUrl = encodeURIComponent(shareData.url)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  /**
   * Compartir en Facebook
   */
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  /**
   * Compartir en WhatsApp
   */
  const shareOnWhatsApp = () => {
    const whatsappText = encodeURIComponent(`${shareData.text} ${shareData.url}`)
    const whatsappUrl = `https://wa.me/?text=${whatsappText}`
    window.open(whatsappUrl, '_blank', 'width=600,height=400')
  }

  /**
   * Compartir en Telegram
   */
  const shareOnTelegram = () => {
    const telegramText = encodeURIComponent(shareData.text)
    const telegramUrl = encodeURIComponent(shareData.url)
    const url = `https://t.me/share/url?url=${telegramUrl}&text=${telegramText}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  /**
   * Compartir en Discord (copia al portapapeles)
   */
  const shareOnDiscord = async () => {
    const discordText = `${shareData.text}\n${shareData.url}`
    try {
      await navigator.clipboard.writeText(discordText)
      alert('✅ Texto copiado al portapapeles. Pégalo en Discord!')
    } catch (error) {
      console.error('Error al copiar:', error)
      alert('❌ No se pudo copiar. Intenta de nuevo.')
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold uppercase tracking-wide text-transparent bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text md:text-4xl">
          Comparte el Evento
        </h2>
        <p className="text-gray-300">
          Invita a la comunidad a participar en los Albion Awards
        </p>
      </div>

      {/* Share Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Web Share API Button (Mobile) */}
        {canShare && (
          <button
            onClick={handleNativeShare}
            disabled={isSharing}
            className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-black/30 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-purple-400/50 hover:bg-black/40 disabled:opacity-50"
            type="button"
          >
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-center gap-3">
              <IconShare size={24} className="text-purple-400" />
              <span className="font-semibold text-white">
                {isSharing ? 'Compartiendo...' : 'Compartir'}
              </span>
            </div>
          </button>
        )}

        {/* Twitter/X Button */}
        <button
          onClick={shareOnTwitter}
          className="group relative overflow-hidden rounded-xl border border-cyan-500/30 bg-black/30 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:bg-black/40"
          type="button"
        >
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-blue-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center gap-3">
            <IconBrandX size={24} className="text-cyan-400" />
            <span className="font-semibold text-white">Twitter/X</span>
          </div>
        </button>

        {/* Facebook Button */}
        <button
          onClick={shareOnFacebook}
          className="group relative overflow-hidden rounded-xl border border-blue-500/30 bg-black/30 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-blue-400/50 hover:bg-black/40"
          type="button"
        >
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-indigo-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center gap-3">
            <IconBrandFacebook size={24} className="text-blue-400" />
            <span className="font-semibold text-white">Facebook</span>
          </div>
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={shareOnWhatsApp}
          className="group relative overflow-hidden rounded-xl border border-green-500/30 bg-black/30 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-green-400/50 hover:bg-black/40"
          type="button"
        >
          <div className="absolute inset-0 bg-linear-to-br from-green-500/20 to-emerald-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center gap-3">
            <IconBrandWhatsapp size={24} className="text-green-400" />
            <span className="font-semibold text-white">WhatsApp</span>
          </div>
        </button>

        {/* Telegram Button */}
        <button
          onClick={shareOnTelegram}
          className="group relative overflow-hidden rounded-xl border border-sky-500/30 bg-black/30 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-sky-400/50 hover:bg-black/40"
          type="button"
        >
          <div className="absolute inset-0 bg-linear-to-br from-sky-500/20 to-blue-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center gap-3">
            <IconBrandTelegram size={24} className="text-sky-400" />
            <span className="font-semibold text-white">Telegram</span>
          </div>
        </button>

        {/* Discord Button */}
        <button
          onClick={shareOnDiscord}
          className="group relative overflow-hidden rounded-xl border border-indigo-500/30 bg-black/30 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-indigo-400/50 hover:bg-black/40"
          type="button"
        >
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center gap-3">
            <IconBrandDiscord size={24} className="text-indigo-400" />
            <span className="font-semibold text-white">Discord</span>
          </div>
        </button>
      </div>
    </div>
  )
}
