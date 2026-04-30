import { motion } from "framer-motion";
import { FaRocket, FaWallet, FaTools, FaHeadset } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import RequestDocumentModal from "../modals/RequestDocumentModal";

const Help = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const helpCategories = [
    {
      title: t('help.categories.getting_started'),
      icon: <FaRocket />,
      items: [
        "Choosing the right template",
        "Using AI to polish your content",
        "Managing your document library",
        "Exporting to professional PDF"
      ]
    },
    {
      title: t('help.categories.payments_credits'),
      icon: <FaWallet />,
      items: [
        "How the credit system works",
        "Purchasing bulk agent packs",
        "Refunding unsuccessful transitions",
        "Accepted payment methods"
      ]
    },
    {
      title: t('help.categories.troubleshooting'),
      icon: <FaTools />,
      items: [
        "PDF alignment issues",
        "AI extraction errors",
        "Account access recovery",
        "Browser compatibility"
      ]
    }
  ];

  return (
    <div className="py-24 bg-neutral-light min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <header className="max-w-3xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-premium text-primary mb-4"
          >
            {t('help.support_hub')}
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-display text-secondary mb-8 leading-none"
            dangerouslySetInnerHTML={{ __html: t('help.hero_title') }}
          />
          <p className="text-lg font-bold text-secondary/40 uppercase tracking-tight">
            {t('help.hero_subtitle')}
          </p>
        </header>

        {/* Help Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-32">
          {helpCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card-premium group hover:border-primary transition-all duration-500 bg-white"
            >
              <div className="w-16 h-16 bg-neutral-light rounded-2xl flex items-center justify-center text-3xl text-secondary/20 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 mb-8 text-left">
                 {category.icon}
              </div>
              <h3 className="text-xl font-black text-secondary uppercase tracking-tighter mb-8 group-hover:text-primary transition-colors text-left">
                {category.title}
              </h3>
              <ul className="space-y-4 text-left">
                {category.items.map((item, i) => (
                  <li key={i} className="text-[10px] font-black text-secondary/60 uppercase tracking-widest hover:text-primary cursor-pointer transition-colors border-b border-secondary/5 pb-2">
                    {item} →
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Support Section */}
        <section className="bg-secondary rounded-[3rem] p-16 text-center shadow-premium relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.5em] mb-6">{t('help.direct_channel')}</h3>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: t('help.still_questions') }} />
              <p className="max-w-xl mx-auto text-white/40 font-bold uppercase tracking-tight mb-12">
                {t('help.support_desc')}
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary px-8 md:px-12 py-4 md:py-6 text-xs flex items-center justify-center gap-4 mx-auto hover:scale-105 transition-transform"
              >
                <FaHeadset /> {t('help.contact_support')}
              </button>
           </div>
           
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32" />
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        </section>
      </div>

      <RequestDocumentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Help;
