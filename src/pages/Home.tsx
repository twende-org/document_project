// src/pages/Home.tsx
import HOME from '../components/sections/Home';
import StatsSection from '../components/sections/StatsSection';
import PRICING from '../pages/Pricing';
import Help from "../pages/Help";

export const Home = () => {
  return (
    <main className="space-y-4 bg-background">
      <HOME/>
      <StatsSection />
      <Help />

      <PRICING />
    </main>
  );
};

export default Home;