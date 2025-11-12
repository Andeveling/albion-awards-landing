import { CategoriesList } from "./components/CategoriesList";
import { Countdown } from "./components/Countdown";
import { CreatorBadge } from "./components/CreatorBadge";
import { EventInfo } from "./components/EventInfo";
import { Footer } from "./components/Footer";
import { ParallaxBackground } from "./components/ParallaxBackground";
import { ShareButtons } from "./components/ShareButtons";

export const App = () => {
	return (
		<div className="relative min-h-screen bg-black">
			{/* Parallax Background - Fixed for entire page */}
			<ParallaxBackground />

			{/* Content - Relative positioning above background */}
			<div className="relative z-10">
				{/* Hero Section with Countdown */}
				<Countdown />

				{/* Share Buttons */}
				<ShareButtons />

				{/* Categories Section */}
				<CategoriesList />

				<CreatorBadge />
				{/* Event Info & Organizers */}
				<EventInfo />

				{/* Footer */}
				<Footer />
			</div>
		</div>
	);
};
