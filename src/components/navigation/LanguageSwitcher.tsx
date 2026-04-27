import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sw' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-1 py-1 w-16 h-8 hover:bg-white/10 transition-all active:scale-95 group"
      title={i18n.language === 'en' ? 'Switch to Swahili' : 'Badili kwenda Kiingereza'}
    >
      <motion.div
        className="absolute w-6 h-6 bg-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center text-[10px] font-black text-white"
        animate={{ x: i18n.language === 'en' ? 0 : 32 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {i18n.language.toUpperCase()}
      </motion.div>
      <div className="flex justify-between w-full px-2 pointer-events-none">
        <span className={`text-[8px] font-black tracking-widest ${i18n.language === 'en' ? 'opacity-0' : 'opacity-40 text-white'}`}>EN</span>
        <span className={`text-[8px] font-black tracking-widest ${i18n.language === 'sw' ? 'opacity-0' : 'opacity-40 text-white'}`}>SW</span>
      </div>
    </button>
  );
};
