import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft, FaFileInvoice, FaQuoteRight, FaBusinessTime, FaArrowRight } from 'react-icons/fa';

const BusinessDocs = () => {
  const { t } = useTranslation();
  
  const documents = [
    { 
      title: 'Proforma Invoice', 
      titleSw: 'Invoisi ya Profoma', 
      description: 'Generate professional billing documents with automated totals.',
      path: '/create/proforma', 
      icon: FaFileInvoice 
    },
    { 
      title: 'Quotation', 
      titleSw: 'Nukuu ya Bei', 
      description: 'Create detailed price estimates for your clients and services.',
      path: '/create/quotation', 
      icon: FaQuoteRight 
    },
    { 
      title: 'Business Letter', 
      titleSw: 'Barua ya Biashara', 
      description: 'Draft formal corporate communications with professional formatting.',
      path: '/create/business_letter', 
      icon: FaBusinessTime 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <NavLink to="/create" className="flex items-center text-redMain font-black uppercase text-xs tracking-widest hover:translate-x-[-4px] transition-transform mb-8">
            <FaArrowLeft className="mr-2" /> {t('common.back')}
          </NavLink>
          <h1 className="text-4xl md:text-6xl font-black text-charcoal dark:text-white mb-4 uppercase tracking-tighter">
            Business <span className="text-redMain">& Professional</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            High-Impact Corporate Documentation
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {documents.map((doc) => (
            <NavLink
              key={doc.title}
              to={doc.path}
              className="card-premium group p-10 flex flex-col hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-charcoal flex items-center justify-center mb-8 group-hover:bg-redMain group-hover:text-white transition-all shadow-inner">
                <doc.icon className="text-2xl" />
              </div>
              <h3 className="text-2xl font-black text-charcoal dark:text-white mb-2 uppercase tracking-tighter">
                {t('common.home') === 'Home' ? doc.title : doc.titleSw}
              </h3>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-8 flex-grow leading-loose">
                {doc.description}
              </p>
              <div className="flex items-center text-redMain font-black uppercase text-[10px] tracking-[0.2em]">
                <span>Create Now</span>
                <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDocs;
