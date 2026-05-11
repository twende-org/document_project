import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchDocRequests } from "../../store/docRequestsSlice";
import { useEffect, useState } from "react";
import { FaInfoCircle, FaTimes, FaBell } from "react-icons/fa";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { 
  FaArrowRight, 
  FaFileAlt, 
  FaFileInvoice, 
  FaEnvelope, 
  FaUser, 
  FaStore,
  FaWhatsapp
} from "react-icons/fa";

export const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { requests } = useSelector((state: RootState) => state.docRequests);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchDocRequests());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (requests.length > 0) {
      const latestUpdate = requests.find(r => r.status === 'ADDED' || r.status === 'DEVELOPING');
      if (latestUpdate) {
        const storageKey = 'dismissed_req_' + String(latestUpdate.id) + '_' + String(latestUpdate.status);
        if (!localStorage.getItem(storageKey)) {
          setShowNotification(true);
        }
      }
    }
  }, [requests]);

  const handleDismiss = () => {
    const latestUpdate = requests.find(r => r.status === 'ADDED' || r.status === 'DEVELOPING');
    if (latestUpdate) {
      const storageKey = 'dismissed_req_' + String(latestUpdate.id) + '_' + String(latestUpdate.status);
      localStorage.setItem(storageKey, 'true');
    }
    setShowNotification(false);
  };


  return (
    <div className="flex flex-col w-full bg-white font-sans selection:bg-primary/10 selection:text-primary">
      {/* 1. HERO SECTION */}
      
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary text-white overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <FaBell className="animate-bounce" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Request Update</p>
                  <p className="text-xs font-bold">
                    {requests.some(r => r.status === "ADDED") 
                      ? "Great news! One of your requested document templates is now available."
                      : "Update: Our team is currently working on your document request."}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/panel" className="bg-white text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-light transition-all">
                  View Details
                </Link>
                <button onClick={handleDismiss} className="text-white/60 hover:text-white">
                  <FaTimes />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-neutral-light">
        <div className="container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-primary"></span>
              <span className="text-primary font-black uppercase tracking-[0.4em] text-action">{t('common.professional_excellence')}</span>
            </div>
            <h1 className="text-3xl md:text-display" dangerouslySetInnerHTML={{ __html: t('home.hero_title') }} />
            <p className="text-lg text-secondary/60 font-medium max-w-xl leading-relaxed">
              {t('home.hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
              <Link
                to="/documents"
                className="btn-primary flex items-center justify-center gap-3 group w-full sm:w-auto"
              >
                {t('common.start_creating')} <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/documents?mode=showcase"
                className="btn-ghost flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                {t('home.try_sample')}
              </Link>
              <button
                onClick={() => {
                  const text = `I found this amazing Document Architect for creating CVs and Invoices! Check it out: https://docs.twendedigital.tech`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="flex items-center justify-center gap-3 w-full sm:w-auto bg-[#25D366] text-white px-6 py-4 rounded-button font-bold text-[10px] md:text-action uppercase tracking-widest hover:bg-[#128C7E] transition-all"
              >
                <FaWhatsapp size={18} /> Share App
              </button>
            </div>
          </motion.div>

          {/* Abstract Visual Representing Documents */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 border-[16px] border-primary/5 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-48 h-48 border-[16px] border-secondary/5 rounded-card rotate-45"></div>
              <div className="bg-white p-12 rounded-card shadow-premium relative z-10 border border-neutral-border">
                 <FaFileAlt className="text-primary text-6xl mb-8" />
                 <div className="space-y-4">
                    <div className="h-4 w-32 bg-secondary/10 rounded-full"></div>
                    <div className="h-4 w-48 bg-secondary/5 rounded-full"></div>
                    <div className="h-4 w-40 bg-secondary/10 rounded-full"></div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. QUICK ACTIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <header className="mb-16">
            <h2 className="label-premium">{t('home.quick_access')}</h2>
            <h3 className="text-heading text-secondary">{t('home.modular_entry')}</h3>
          </header>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t('common.create') + " CV", icon: <FaFileAlt />, path: "/create/cv", desc: t('home.for_individuals_desc').split('.')[0] + "." },
              { title: t('common.create') + " Invoice", icon: <FaFileInvoice />, path: "/create/invoice", desc: t('home.step_2_desc') },
              { title: t('common.create') + " Letter", icon: <FaEnvelope />, path: "/create/letter", desc: t('home.for_individuals_desc').split('.')[0] + "." }
            ].map((action, i) => (
              <Link to={action.path} key={i} className="card-premium group">
                <div className="w-16 h-16 bg-neutral-light rounded-button flex items-center justify-center text-2xl text-secondary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {action.icon}
                </div>
                <h4 className="text-xl font-black uppercase mb-2">{action.title}</h4>
                <p className="text-secondary/50 text-sm mb-6">{action.desc}</p>
                <FaArrowRight className="text-primary group-hover:translate-x-2 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-24 bg-secondary text-white">
        <div className="container mx-auto px-6">
          <header className="text-center mb-20">
            <h2 className="label-premium text-primary">{t('home.process_flow')}</h2>
            <h3 className="text-heading text-white">{t('home.how_it_works')}</h3>
          </header>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { step: "01", title: t('home.step_1_title'), desc: t('home.step_1_desc') },
              { step: "02", title: t('home.step_2_title'), desc: t('home.step_2_desc') },
              { step: "03", title: t('home.step_3_title'), desc: t('home.step_3_desc') }
            ].map((step, i) => (
              <div key={i} className="space-y-6">
                <span className="text-display text-primary/20 block">{step.step}</span>
                <h4 className="text-xl font-black uppercase">{step.title}</h4>
                <p className="text-white leading-relaxed font-bold">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TARGET USERS */}
      <section className="py-24 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card-premium flex items-start gap-8">
              <FaUser className="text-primary text-4xl mt-2" />
              <div>
                <h3 className="text-2xl font-black uppercase mb-4">{t('home.for_individuals')}</h3>
                <p className="text-secondary/60 leading-relaxed font-medium">{t('home.for_individuals_desc')}</p>
              </div>
            </div>
            <div className="card-premium flex items-start gap-8">
              <FaStore className="text-secondary text-4xl mt-2" />
              <div>
                <h3 className="text-2xl font-black uppercase mb-4">{t('home.for_agents')}</h3>
                <p className="text-secondary/60 leading-relaxed font-medium">{t('home.for_agents_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-display text-secondary mb-12 px-4">{t('home.ready_to_begin')}</h2>
          <Link
            to="/create"
            className="btn-primary inline-flex items-center justify-center py-6 px-8 md:px-12 text-sm md:text-lg w-auto max-w-full"
          >
            {t('home.create_first')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;