import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full bg-white font-sans selection:bg-primary/10 selection:text-primary">
      {/* 1. HERO SECTION */}
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
            <h1 className="text-display">
              <Trans i18nKey="home.hero_title">
                Create Professional <br />
                Documents in Minutes <br />
                — <span className="text-primary">Not Hours</span>
              </Trans>
            </h1>
            <p className="text-lg text-secondary/60 font-medium max-w-xl leading-relaxed">
              {t('home.hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                to="/documents"
                className="btn-primary flex items-center gap-3 group"
              >
                {t('common.start_creating')} <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/documents?mode=showcase"
                className="btn-ghost flex items-center gap-3"
              >
                {t('home.try_sample')}
              </Link>
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
                <p className="text-white/50 leading-relaxed font-medium">{step.desc}</p>
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
          <h2 className="text-display text-secondary mb-12">{t('home.ready_to_begin')}</h2>
          <Link
            to="/create"
            className="btn-primary py-6 px-12 text-lg"
          >
            {t('home.create_first')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
  