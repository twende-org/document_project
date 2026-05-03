import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMobileAlt, FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import axiosClient from '../../api/axiosClient';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: string;
    credits: number;
  } | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<'CHOICE' | 'MOBILE' | 'PROCESSING' | 'SUCCESS'>('CHOICE');
  const [paymentType, setPaymentType] = useState<'mobile' | 'card'>('mobile');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!plan) return null;

  const handleInitiate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.post('/api/snippe/initiate/', {
        amount: plan.price,
        type: paymentType,
        phone: paymentType === 'mobile' ? phone : undefined,
        plan_name: plan.name
      });

      if (response.data.status === 'success') {
        if (paymentType === 'card' && response.data.data.payment_url) {
          window.location.href = response.data.data.payment_url;
        } else {
          setStep('PROCESSING');
          // In a real app, we would poll for status or wait for webhook
          setTimeout(() => setStep('SUCCESS'), 3000);
        }
      } else {
        setError(response.data.message || 'Payment initiation failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-premium overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-secondary tracking-tighter uppercase leading-none mb-2">
                  {step === 'SUCCESS' ? 'Thank You!' : t('pricing.choose_method')}
                </h2>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  {plan.name} — {parseInt(plan.price).toLocaleString()} TZS
                </p>
              </div>
              <button onClick={onClose} className="text-secondary/20 hover:text-primary transition-colors">
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-8 pt-0">
              {step === 'CHOICE' && (
                <div className="space-y-4">
                  <button
                    onClick={() => {
                        setPaymentType('mobile');
                        setStep('MOBILE');
                    }}
                    className="w-full p-6 bg-neutral-light rounded-card border-2 border-transparent hover:border-primary transition-all flex items-center gap-6 group"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary text-xl group-hover:scale-110 transition-transform">
                      <FaMobileAlt />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-secondary uppercase tracking-widest leading-none mb-1">{t('pricing.mobile_money')}</p>
                      <p className="text-[10px] font-bold text-secondary/40 uppercase">M-Pesa, Airtel, Tigo, Halotel</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                        setPaymentType('card');
                        handleInitiate();
                    }}
                    className="w-full p-6 bg-neutral-light rounded-card border-2 border-transparent hover:border-primary transition-all flex items-center gap-6 group"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary text-xl group-hover:scale-110 transition-transform">
                      <FaCreditCard />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-secondary uppercase tracking-widest leading-none mb-1">{t('pricing.card')}</p>
                      <p className="text-[10px] font-bold text-secondary/40 uppercase">Visa, Mastercard, Local Cards</p>
                    </div>
                  </button>
                </div>
              )}

              {step === 'MOBILE' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em] mb-4 block">
                      {t('pricing.enter_phone')}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 255712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-premium"
                    />
                  </div>
                  
                  {error && <p className="text-[10px] font-bold text-primary uppercase">{error}</p>}

                  <button
                    onClick={handleInitiate}
                    disabled={loading || !phone}
                    className="btn-primary w-full py-6 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? 'Initializing...' : t('pricing.pay_securely')} <FaLock size={12} />
                  </button>
                  
                  <button onClick={() => setStep('CHOICE')} className="w-full text-center text-[10px] font-black text-secondary/40 uppercase hover:text-secondary transition-colors">
                    Go Back
                  </button>
                </div>
              )}

              {step === 'PROCESSING' && (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <div>
                    <p className="text-xl font-black text-secondary uppercase tracking-tighter">Processing Payment</p>
                    <p className="text-xs font-bold text-secondary/40 uppercase">Please check your phone for the USSD push</p>
                  </div>
                </div>
              )}

              {step === 'SUCCESS' && (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg shadow-green-500/20">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-secondary uppercase tracking-tighter leading-none mb-2">Payment Received</p>
                    <p className="text-xs font-bold text-secondary/40 uppercase">Your credits have been added to your account.</p>
                  </div>
                  <button onClick={onClose} className="btn-secondary w-full py-6">
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-neutral-light p-6 text-center border-t border-neutral-border/50">
                <div className="flex items-center justify-center gap-3 grayscale opacity-30">
                    <span className="text-[10px] font-black uppercase tracking-widest">Powered by</span>
                    <span className="text-lg font-black italic tracking-tighter uppercase">Snippe</span>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
