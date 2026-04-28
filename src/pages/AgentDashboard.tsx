import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store/store';
import { CreditWidget } from '../components/agent/CreditWidget';
import { fetchDocuments } from '../features/documents/documentsSlice';
import { 
  FaPlusCircle, 
  FaFileInvoice, 
  FaFileAlt,
  FaEnvelopeOpenText,
  FaHistory,
  FaUserAstronaut,
  FaRocket
} from 'react-icons/fa';

const AgentDashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { list: documents } = useSelector((state: RootState) => state.documents);
  
  const access = useSelector((state: RootState) => state.auth.access);

  useEffect(() => {
    if (access) {
      dispatch(fetchDocuments());
    }
  }, [dispatch, access]);

  const recentJobs = documents.slice(0, 8);

  const quickActions = [
    { 
      title: t('agent.quick_actions.cv_title'), 
      path: '/create/cv', 
      icon: <FaUserAstronaut />, 
      desc: t('agent.quick_actions.cv_desc') 
    },
    { 
      title: t('agent.quick_actions.invoice_title'), 
      path: '/create/invoice', 
      icon: <FaFileInvoice />, 
      desc: t('agent.quick_actions.invoice_desc') 
    },
    { 
      title: t('agent.quick_actions.letter_title'), 
      path: '/create/letter', 
      icon: <FaEnvelopeOpenText />, 
      desc: t('agent.quick_actions.letter_desc') 
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-light py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 bg-secondary rounded-[2rem] flex items-center justify-center text-white text-4xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <FaRocket />
             </div>
             <div className="text-left">
                <h2 className="label-premium text-primary mb-1">{t('agent.agent_station')}</h2>
                <h1 className="text-display text-secondary leading-none" dangerouslySetInnerHTML={{ __html: t('agent.command_center') }} />
             </div>
          </div>
          
          <div className="w-full md:w-80">
            <CreditWidget credits={user?.credit?.downloads_remaining ?? 0} />
          </div>
        </header>

        {/* Quick Actions Grid */}
        <section className="mb-20 text-left">
          <div className="flex items-center gap-4 mb-10 border-b border-secondary/5 pb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-secondary/40">{t('agent.ready_to_generate')}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, idx) => (
              <NavLink key={idx} to={action.path} className="group">
                <div className="bg-white p-10 rounded-card shadow-premium border-2 border-transparent group-hover:border-primary transition-all duration-500 flex flex-col items-center text-center gap-6 group-hover:-translate-y-2 h-full">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-neutral-light flex items-center justify-center text-4xl text-secondary/20 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500">
                    {action.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-secondary tracking-tighter uppercase mb-2 group-hover:text-primary transition-colors">{action.title}</h4>
                    <p className="text-xs font-bold text-secondary/40 uppercase tracking-tight leading-relaxed">{action.desc}</p>
                  </div>
                  <div className="w-10 h-1 bg-secondary/5 group-hover:bg-primary/20 transition-all rounded-full mt-auto" />
                </div>
              </NavLink>
            ))}
          </div>
        </section>

        {/* Recent Activity & Detailed Jobs */}
        <div className="grid lg:grid-cols-12 gap-16">
           <section className="lg:col-span-8 space-y-10 text-left">
              <div className="flex items-center justify-between border-b border-secondary/5 pb-6 mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-secondary/40 flex items-center gap-4">
                  <FaHistory /> {t('agent.recent_operations')}
                </h3>
              </div>
              
              <div className="grid gap-6">
                {recentJobs.length > 0 ? recentJobs.map((job: any) => (
                  <div key={job.id} className="bg-white p-8 rounded-card shadow-sm border border-secondary/5 flex items-center justify-between hover:shadow-premium transition-all group">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-neutral-light rounded-2xl flex items-center justify-center text-secondary/20 group-hover:text-primary transition-colors text-xl">
                          <FaFileAlt />
                       </div>
                       <div>
                          <p className="text-xs font-black text-secondary uppercase tracking-widest mb-1">{job.doc_type}</p>
                          <h5 className="text-lg font-black text-secondary tracking-tighter uppercase">{job.customer_name || t('agent.walk_in_client')}</h5>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${job.status === 'FINAL' ? 'bg-secondary text-white border-secondary' : 'bg-white text-primary border-primary/20 animate-pulse'}`}>
                          {job.status}
                       </span>
                       <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest mt-2">{new Date(job.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                )) : (
                  <div className="bg-white p-20 rounded-card shadow-inner border border-dashed border-secondary/10 text-center">
                     <FaHistory className="text-6xl text-secondary/5 mx-auto mb-6" />
                     <p className="text-xs font-black text-secondary/20 uppercase tracking-[0.3em]">{t('agent.system_idle')}</p>
                  </div>
                )}
              </div>
           </section>

           <aside className="lg:col-span-4 space-y-12 text-left">
              <div className="bg-secondary p-10 rounded-card shadow-premium text-white overflow-hidden relative">
                 <h4 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-8">{t('agent.pro_tip')}</h4>
                 <p className="text-sm font-bold text-white/60 leading-relaxed mb-6 italic relative z-10" dangerouslySetInnerHTML={{ __html: t('agent.pro_tip_desc') }} />
                 <NavLink to="/help" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:tracking-[0.4em] transition-all relative z-10">{t('agent.learn_more')} →</NavLink>
                 <div className="absolute -bottom-10 -right-10 text-9xl text-white/5 rotate-12 -z-0">
                    <FaUserAstronaut />
                 </div>
              </div>
           </aside>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
