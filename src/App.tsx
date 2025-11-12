import { CategoriesList } from "./components/CategoriesList";
import { Countdown } from "./components/Countdown";

export const App = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Countdown */}
      <Countdown />

      {/* Categories Section */}
      <CategoriesList />
    </div>
  );
};
