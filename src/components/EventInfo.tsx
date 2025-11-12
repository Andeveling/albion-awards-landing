import { IconBrandTwitch, IconWorldWww } from "@tabler/icons-react";

/**
 * Componente de información del evento y organizadores
 */
export function EventInfo() {
	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-16">
			{/* Event Description */}
			<div className="mb-12 text-center">
				<h2 className="mb-4 text-3xl font-bold uppercase tracking-wide text-transparent bg-linear-to-br from-amber-400 to-orange-400 bg-clip-text md:text-6xl">
					¿Qué son los Albion Awards?
				</h2>
				<p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-300">
					Los <span className="font-semibold text-white">Albion Awards</span>{" "}
					son los primeros premios dedicados a reconocer el talento y dedicación
					de los <span className="font-semibold text-white">streamers</span> y{" "}
					<span className="font-semibold text-white">
						creadores de contenido
					</span>{" "}
					de Albion Online en la comunidad hispanohablante.
				</p>
				<p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">
					Una celebración del entretenimiento, la creatividad y los momentos
					memorables que hacen grande a nuestra comunidad.
				</p>
			</div>

			{/* Decorative Separator */}
			<div className="mb-12 flex items-center justify-center gap-4">
				<div className="h-px w-16 bg-linear-to-r from-transparent to-amber-500/50" />
				<div className="h-2 w-2 rotate-45 bg-amber-500/50" />
				<div className="h-px w-16 bg-linear-to-r from-amber-500/50 to-transparent" />
			</div>

			{/* Organizers Section */}
			<div className="text-center">
				<h3 className="mb-6 text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
					Organizadores
				</h3>
				<div className="grid gap-6 sm:grid-cols-2">
					{/* Kuruogg */}
					<div className="group relative overflow-hidden rounded-2xl border border-purple-500/30 bg-black/30 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-purple-400/50 hover:bg-black/40">
						<div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						<div className="relative">
							<div className="mb-4 flex justify-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 backdrop-blur-sm">
									<IconBrandTwitch size={32} className="text-purple-400" />
								</div>
							</div>
							<h4 className="mb-2 text-xl font-bold text-white">Kuruogg</h4>
							<p className="mb-4 text-sm text-gray-400">
								Streamer de Albion Online
							</p>
							<a
								href="https://www.twitch.tv/kuruogg"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-lg bg-purple-500/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500/30"
							>
								<IconBrandTwitch size={18} />
								Ver en Twitch
							</a>
						</div>
					</div>

					{/* Andeveling */}
					<div className="group relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-black/30 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:bg-black/40">
						<div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-blue-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						<div className="relative">
							<div className="mb-4 flex justify-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 backdrop-blur-sm">
									<IconWorldWww size={32} className="text-cyan-400" />
								</div>
							</div>
							<h4 className="mb-2 text-xl font-bold text-white">Andeveling</h4>
							<p className="mb-4 text-sm text-gray-400">Desarrollador Web</p>
							<a
								href="https://andeveling.vercel.app/"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-500/30"
							>
								<IconWorldWww size={18} />
								Ver Portfolio
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
