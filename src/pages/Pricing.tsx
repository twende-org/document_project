import React, { useState } from "react";
import PricingCard from "../components/sections/Pricing";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PaymentModal from "../components/modals/PaymentModal";

const Pricing = () => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuy = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const plans = [
    {
      name: t('pricing.plans.single_boost'),
      price: "1000",
      credits: 1,
      description: t('pricing.plans.single_boost_desc'),
      isPopular: false
    },
    {
      name: t('pricing.plans.basic_bundle'),
      price: "5000",
      credits: 10,
      description: t('pricing.plans.basic_bundle_desc'),
      isPopular: true
    },
    {
      name: t('pricing.plans.agent_pro'),
      price: "10000",
      credits: 25,
      description: t('pricing.plans.agent_pro_desc'),
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
             {t('pricing.flexible_power')}
           </motion.h2>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-display text-secondary mb-8 leading-none"
             dangerouslySetInnerHTML={{ __html: t('pricing.hero_title') }}
           />
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-lg font-bold text-secondary/40 uppercase tracking-tight"
           >
             {t('pricing.hero_subtitle')}
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
           <h3 className="text-[10px] font-black text-secondary/20 uppercase tracking-[0.5em] mb-8">{t('pricing.secure_partners')}</h3>
           <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="text-3xl font-black text-secondary tracking-tighter uppercase italic text-primary">Snippe</span>
              <span className="text-3xl font-black text-secondary tracking-tighter uppercase italic">Azam<span className="text-primary">Pay</span></span>
              <span className="text-3xl font-black text-secondary tracking-tighter uppercase">Stripe</span>
           </div>
        </section>

        <PaymentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          plan={selectedPlan} 
        />
      </div>
    </div>
  );
};

export default Pricing;
