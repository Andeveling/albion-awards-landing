
/**
 * Componente Footer con disclaimer del evento
 */
export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-white/10 bg-black/50 backdrop-blur-md">
			<div className="mx-auto max-w-7xl px-4 py-8">
				{/* Disclaimer */}
				<div className="mb-6 text-center">
					<p className="text-sm text-gray-400">
						<span className="font-semibold text-amber-400">
							⚠️ Evento no oficial
						</span>{" "}
						organizado por la comunidad de Albion Online
					</p>
					<p className="mt-2 text-xs text-gray-500">
						Este evento no está afiliado, asociado, autorizado, respaldado por,
						ni de ninguna manera oficialmente conectado con Sandbox Interactive
						GmbH o Albion Online.
					</p>
				</div>

				{/* Decorative Divider */}
				<div className="mb-6 flex items-center justify-center gap-4">
					<div className="h-px w-24 bg-linear-to-r from-transparent to-white/10" />
					<div className="h-1 w-1 rounded-full bg-white/20" />
					<div className="h-px w-24 bg-linear-to-r from-white/10 to-transparent" />
				</div>

				{/* Copyright & Credits */}
				<div className="text-center">
					<p className="text-xs text-gray-500">
						© {currentYear} Albion Awards. Hecho con ❤️ por la comunidad
						hispanohablante de Albion Online
					</p>
					<p className="mt-2 text-xs text-gray-600">
						Powered by{" "}
						<a
							href="https://andeveling.vercel.app/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-cyan-400 transition-colors hover:text-cyan-300"
						>
							Andeveling
						</a>{" "}
						y{" "}
						<a
							href="https://www.twitch.tv/kuruogg"
							target="_blank"
							rel="noopener noreferrer"
							className="text-purple-400 transition-colors hover:text-purple-300"
						>
							Kuruogg
						</a>
					</p>
				</div>

				{/* Social Links */}
				<div className="mt-6 flex items-center justify-center gap-4">
					<a
						href="https://www.twitch.tv/kuruogg"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-500 transition-colors hover:text-purple-400"
						aria-label="Twitch de Kuruogg"
					>
						<svg
							className="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
						</svg>
					</a>
					<a
						href="https://andeveling.vercel.app/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-500 transition-colors hover:text-cyan-400"
						aria-label="Portfolio de Andeveling"
					>
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
							/>
						</svg>
					</a>
				</div>
			</div>
		</footer>
	);
}
