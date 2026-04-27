import PricingCard from "../components/sections/Pricing";
import { motion } from "framer-motion";

const Pricing = () => {
  const handleBuy = (plan: any) => {
    // TODO: integrate payment logic (AzamPay/Stripe)
    alert(`Redirecting to secure gateway for ${plan.name}...`);
  };

  const plans = [
    {
      name: "Single Boost",
      price: "1000",
      credits: 1,
      description: "Perfect for a quick one-off professional document.",
      isPopular: false
    },
    {
      name: "Basic Bundle",
      price: "5000",
      credits: 10,
      description: "Optimized for light business use and frequent updates.",
      isPopular: true
    },
    {
      name: "Agent Pro",
      price: "10000",
      credits: 25,
      description: "Designed for high-traffic stationery shop operations.",
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-light py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="max-w-3xl mx-auto text-center mb-24">
           <motion.h2 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="label-premium text-primary mb-4"
           >
             Flexible Power
           </motion.h2>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-display text-secondary mb-8 leading-none"
           >
             Professional Credits for <span className="text-primary italic">Every Need</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-lg font-bold text-secondary/40 uppercase tracking-tight"
           >
             Purchase credits once, use them whenever you need. No subscriptions, just results.
           </motion.p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch pt-12">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <PricingCard
                name={plan.name}
                price={plan.price}
                credits={plan.credits}
                description={plan.description}
                isPopular={plan.isPopular}
                onBuy={() => handleBuy(plan)}
              />
            </motion.div>
          ))}
        </div>

        <section className="mt-32 text-center border-t border-secondary/5 pt-20">
           <h3 className="text-[10px] font-black text-secondary/20 uppercase tracking-[0.5em] mb-8">Secure Payment Partners</h3>
           <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="text-3xl font-black text-secondary tracking-tighter uppercase italic">Azam<span className="text-primary">Pay</span></span>
              <span className="text-3xl font-black text-secondary tracking-tighter uppercase">Stripe</span>
              <span className="text-3xl font-black text-secondary tracking-tighter uppercase italic text-primary">T-Pesa</span>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
