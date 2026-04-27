// src/pages/Home.tsx
import HOME from '../components/sections/Home';
import PRICING from '../pages/Pricing';
import Help from "../pages/Help";

export const Home = () => {
  return (
    <main className="space-y-4 bg-background">
      <HOME/>
      <Help />

      <PRICING />
    </main>
  );
};

export default Home;