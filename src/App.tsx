import { CategoriesList } from "./components/CategoriesList";
import { Countdown } from "./components/Countdown";
import { EventInfo } from "./components/EventInfo";
import { Footer } from "./components/Footer";
import { ShareButtons } from "./components/ShareButtons";

export const App = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Countdown */}
      <Countdown />

      {/* Share Buttons */}
      <ShareButtons />

      {/* Categories Section */}
      <CategoriesList />

      {/* Event Info & Organizers */}
      <EventInfo />

      {/* Footer */}
      <Footer />
    </div>
  );
};
