import React from 'react';
import { FaCoins, FaPlusCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

interface CreditWidgetProps {
  credits: number;
}

export const CreditWidget: React.FC<CreditWidgetProps> = ({ credits }) => {
  return (
    <div className="bg-secondary p-8 rounded-card shadow-premium border-l-4 border-primary relative overflow-hidden group">
      <div className="flex justify-between items-center relative z-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Service Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white tracking-tighter tabular-nums">{credits}</span>
            <span className="text-xs font-bold text-primary uppercase">Credits</span>
          </div>
        </div>
        <div className="text-5xl text-primary/20 group-hover:text-primary transition-colors duration-500">
          <FaCoins />
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 flex gap-4 relative z-10">
        <NavLink to="/pricing" className="flex-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-button text-center hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
          <FaPlusCircle /> Top Up
        </NavLink>
      </div>

      {/* Decorative pulse background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 animate-pulse" />
    </div>
  );
};
