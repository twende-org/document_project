import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface RequestDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestDocumentModal: React.FC<RequestDocumentModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { access } = useSelector((state: RootState) => state.auth);
  
  const [docName, setDocName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/requests/`,
        {
          doc_name: docName,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      setIsSuccess(true);
      setDocName('');
      setDescription('');
    } catch (err: any) {
      console.error('Failed to submit request:', err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1F2937]/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#B91C1C] p-8 text-white flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tighter uppercase">{t('common.request_document', 'Request Document')}</h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">{t('common.help_us_grow', 'Help us build a better catalog')}</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-8">
              {isSuccess ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-[2rem] flex items-center justify-center text-4xl mx-auto animate-bounce">
                    <FaCheckCircle />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#1F2937] uppercase tracking-tighter">{t('common.request_received', 'Request Received!')}</h3>
                    <p className="text-sm font-medium text-gray-400">
                      {t('common.request_success_desc', 'Our architects have received your suggestion. We will notify you once this document type is added.')}
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-8 py-4 bg-[#1F2937] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                  >
                    {t('common.close')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  {error && (
                    <div className="p-4 bg-red-50 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold uppercase tracking-tight">
                      <FaExclamationTriangle /> {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('common.document_name', 'Document Name')}</label>
                    <input 
                      type="text" 
                      required
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      placeholder="e.g. Sales Agreement, Tenant Notice..."
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-100 font-bold text-sm text-[#111827] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('common.description_opt', 'Description (Optional)')}</label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t('common.how_will_you_use', 'How will you use this document?')}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-100 font-bold text-sm text-[#111827] outline-none transition-all h-32 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting || !docName.trim()}
                    className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${
                      isSubmitting 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-[#1F2937] text-white hover:bg-[#B91C1C] hover:shadow-red-900/20 active:scale-95'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">{t('common.submitting', 'Submitting...')}</span>
                    ) : (
                      <>
                        <FaPaperPlane /> {t('common.submit_request', 'Submit Request')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RequestDocumentModal;
