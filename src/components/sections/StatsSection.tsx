import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaFileAlt, FaUsers, FaStore, FaCheckCircle } from 'react-icons/fa';
import publicClient from '../../api/publicClient';

interface Stats {
  users: number;
  documents: number;
  agents: number;
  requests: number;
}

const StatsSection = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<Stats>({ users: 0, documents: 0, agents: 0, requests: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await publicClient.get('/auth/public-stats/');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    { 
      label: t('home.stats.documents'), 
      value: stats.documents, 
      icon: <FaFileAlt />, 
      color: 'text-primary' 
    },
    { 
      label: t('home.stats.users'), 
      value: stats.users, 
      icon: <FaUsers />, 
      color: 'text-secondary' 
    },
    { 
      label: t('home.stats.agents'), 
      value: stats.agents, 
      icon: <FaStore />, 
      color: 'text-primary' 
    },
    { 
      label: t('home.stats.success_rate'), 
      value: 99.9, 
      suffix: '%', 
      icon: <FaCheckCircle />, 
      color: 'text-green-500' 
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden border-y border-neutral-border/50">
      <div className="container mx-auto px-6">
        <header className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="h-px w-12 bg-primary"></span>
            <span className="label-premium !mb-0">{t('home.stats.title')}</span>
            <span className="h-px w-12 bg-primary"></span>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-display text-secondary"
          >
            {t('home.stats.subtitle')}
          </motion.h3>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-neutral-light p-10 rounded-card shadow-premium border border-neutral-border flex flex-col items-center text-center group relative overflow-hidden"
            >
              {/* Decorative Background Element */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              
              <div className={`text-4xl mb-6 ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              <div className="text-5xl font-black text-secondary mb-3 tracking-tighter">
                <Counter value={item.value} />
                {item.suffix}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) {
        setCount(0);
        return;
    }
    
    const duration = 2000;
    const steps = 50;
    const increment = end / steps;
    const stepTime = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

export default StatsSection;
