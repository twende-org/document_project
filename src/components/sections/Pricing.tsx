import React from "react";
import { FaCheck, FaCrown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface PricingCardProps {
  name: string;
  price: string;
  credits: number;
  isPopular?: boolean;
  onBuy?: () => void;
  description: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ name, price, credits, isPopular, onBuy, description }) => {
  const { t } = useTranslation();
  
  return (
    <div className={`card-premium group relative flex flex-col h-full bg-white transition-all duration-500 hover:-translate-y-4 ${isPopular ? 'border-2 border-primary shadow-2xl' : 'border border-secondary/5'}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
          <FaCrown /> {t('pricing.plans.agent_pro')}
        </div>
      )}
      
      <div className="p-8 pb-0 text-left">
        <h3 className="text-xs font-black text-secondary/40 uppercase tracking-[0.4em] mb-4">{name}</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-black text-secondary tracking-tighter tabular-nums group-hover:text-primary transition-colors">
            {parseInt(price).toLocaleString()}
          </span>
          <span className="text-xs font-bold text-secondary/40 uppercase">TZS</span>
        </div>
        <p className="text-xs font-bold text-secondary/60 leading-relaxed uppercase tracking-tight mb-8">
          {description}
        </p>
      </div>

      <div className="px-8 flex-1">
         <div className="bg-neutral-light p-6 rounded-card border border-secondary/5 mb-8">
            <div className="flex items-center justify-between">
               <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{t('pricing.credits')}</span>
               <span className="text-xl font-black text-primary group-hover:scale-110 transition-transform">{credits}</span>
            </div>
         </div>
         
         <ul className="space-y-4 mb-12">
            {[
              'Instant PDF Generation',
              'Cloud Auto-Save',
              'AI Search Optimization',
              'Priority Support'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-[10px] font-black text-secondary/60 uppercase tracking-widest leading-none">
                <FaCheck className="text-primary" /> {feature}
              </li>
            ))}
         </ul>
      </div>

      <div className="p-8 pt-0 mt-auto">
        <button
          onClick={onBuy}
          className={`w-full py-6 rounded-button font-black uppercase tracking-[0.4em] text-xs transition-all duration-300 flex items-center justify-center gap-3 ${isPopular ? 'bg-secondary text-white hover:bg-charcoal' : 'bg-primary text-white hover:bg-red-700'}`}
        >
          {t('pricing.buy_now')}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
