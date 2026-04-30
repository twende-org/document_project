import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaEdit, 
  FaDownload, 
  FaTrash, 
  FaCalendarAlt, 
  FaUser, 
  FaFileAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeDocument } from '../../features/documents/documentsSlice';
import type { AppDispatch } from '../../store/store';
import { useTranslation } from 'react-i18next';

import { generateClientPDF } from '../../utils/pdfGenerator';
import { startFactory, stopFactory } from '../../store/uiSlice';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: any;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ isOpen, onClose, document }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  if (!document) return null;

  const handleDelete = async () => {
    if (window.confirm(t('common.confirm_delete_archive', 'Are you sure you want to delete this document from your archive?'))) {
      await dispatch(removeDocument(document.id));
      onClose();
    }
  };

  const handleEdit = () => {
    // Navigate to the appropriate editor based on doc_type
    const typeMap: Record<string, string> = {
      'CV': '/create/cv',
      'INVOICE': '/create/invoice',
      'LETTER': '/create/letter',
      'AFFIDAVIT': '/create/affidavit',
      'PROFORMA': '/create/proforma',
      'QUOTATION': '/create/quotation',
      'EVENT_PROGRAM': '/create/event-program'
    };
    const path = typeMap[document.doc_type] || '/create';
    navigate(`${path}?id=${document.id}`);
    onClose();
  };

  const handleDownload = async () => {
    try {
      dispatch(startFactory(t('common.assembling_doc', "Retrieving and assembling archived document...")));
      await generateClientPDF(document.doc_type, document.content, document.title || 'document', document.settings);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert(t('common.pdf_fail', 'Failed to generate PDF on the client side.'));
    } finally {
      dispatch(stopFactory());
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
            className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1F2937] p-8 text-white flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#B91C1C] text-[10px] font-black uppercase tracking-widest rounded-full">
                    {document.doc_type}
                  </span>
                  <span className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest text-left">
                    <FaCheckCircle className="text-green-500" /> {document.status}
                  </span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase text-left">{document.title || t('common.untitled')}</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8 text-left">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <FaUser className="text-[#B91C1C]" /> {t('quotation.customer_name')}
                  </p>
                  <p className="text-lg font-bold text-[#1F2937]">{document.customer_name || t('common.personal_project')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <FaCalendarAlt className="text-[#B91C1C]" /> {t('common.created_on', 'Created On')}
                  </p>
                  <p className="text-lg font-bold text-[#1F2937]">{new Date(document.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Preview Placeholder */}
              <div className="aspect-video bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 space-y-4">
                <FaFileAlt size={48} className="text-gray-200" />
                <p className="text-[10px] font-black uppercase tracking-widest">{t('common.integrity_verified', 'Document Integrity Verified')}</p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={handleEdit}
                  className="flex flex-col items-center gap-3 p-6 rounded-3xl border border-gray-100 hover:border-[#B91C1C] hover:bg-red-50 transition-all group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#1F2937] group-hover:bg-[#B91C1C] group-hover:text-white transition-all text-xl">
                    <FaEdit />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#B91C1C]">{t('common.edit', 'Edit')}</span>
                </button>

                <button 
                  onClick={handleDownload}
                  className="flex flex-col items-center gap-3 p-6 rounded-3xl border border-gray-100 hover:border-green-600 hover:bg-green-50 transition-all group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#1F2937] group-hover:bg-green-600 group-hover:text-white transition-all text-xl">
                    <FaDownload />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-green-600">{t('common.download', 'Download')}</span>
                </button>

                <button 
                  onClick={handleDelete}
                  className="flex flex-col items-center gap-3 p-6 rounded-3xl border border-gray-100 hover:border-gray-800 hover:bg-gray-100 transition-all group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#1F2937] group-hover:bg-gray-800 group-hover:text-white transition-all text-xl">
                    <FaTrash />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-800">{t('common.delete', 'Delete')}</span>
                </button>
              </div>
            </div>

            {/* Footer Tip */}
            <div className="bg-gray-50 p-6 text-center">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">
                Secure Industry-Standard Vault • GENDOCS Precision Systems
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DocumentPreviewModal;
