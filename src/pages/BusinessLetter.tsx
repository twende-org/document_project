import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaBriefcase, FaSave, FaEye, FaDownload } from 'react-icons/fa';
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { RootState, AppDispatch } from '../store/store';
import { saveDocument, aiPolishDocument } from '../features/documents/documentsSlice';
import LetterPDF from "../components/templates/document-templates/LetterPDF";

const BusinessLetter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((state: RootState) => state.documents);

  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    date: new Date().toISOString().split('T')[0],
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    companyAddress: '',
    subject: 'Business Inquiry',
    letterContent: 'I am writing to inquire about...',
  });

  // Sync Redux state to local form if current document changes
  React.useEffect(() => {
    if (current && current.doc_type === 'BUSINESS_LETTER') {
      setFormData(current.content);
    }
  }, [current]);

  const handleSave = () => {
    dispatch(saveDocument({
      id: current?.id,
      doc_type: 'BUSINESS_LETTER',
      title: `Business Letter: ${formData.subject}`,
      content: formData
    })).unwrap()
    .then(() => alert("Letter saved successfully!"))
    .catch((err) => alert(err || "Failed to save letter."));
  };

  const handlePolish = () => {
    if (!current?.id) {
       alert("Please save the letter first to polish with AI!");
       return;
    }
    dispatch(aiPolishDocument(current.id)).unwrap()
    .then(() => alert("AI has polished your business letter!"))
    .catch((err) => alert(err || "AI Polishing failed."));
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 min-h-screen">
      <NavLink to="/documents" className="flex items-center text-redMain hover:text-red-700 mb-8 transition-colors font-bold">
        <FaArrowLeft className="mr-2" /> {t('common.back')}
      </NavLink>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-fit">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl">
                <FaBriefcase className="text-2xl text-redMain" />
              </div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">Business Letter</h1>
            </div>

            <div className="flex gap-2">
                <button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 transition-all text-gray-600 dark:text-gray-200"
                  title="Save Draft"
                >
                  <FaSave />
                </button>
                <button 
                  onClick={handlePolish}
                  disabled={loading}
                  className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 transition-all text-redMain animate-pulse"
                  title="Polish with AI"
                >
                  ✨
                </button>
            </div>
          </div>

          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" value={formData.senderName} onChange={e => setFormData({...formData, senderName: e.target.value})} className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none dark:text-white" />
                <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none dark:text-white" />
             </div>
             <input type="text" placeholder="Recipient Name" value={formData.recipientName} onChange={e => setFormData({...formData, recipientName: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none dark:text-white" />
             <input type="text" placeholder="Subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none dark:text-white font-bold" />
             <textarea rows={8} value={formData.letterContent} onChange={e => setFormData({...formData, letterContent: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none dark:text-white" />

             <PDFDownloadLink
                document={<LetterPDF data={{ 
                  applicantName: formData.senderName, 
                  date: formData.date, 
                  recipientName: formData.recipientName, 
                  subject: formData.subject,
                  letterContent: formData.letterContent
                }} />}
                fileName={`Business_Letter_${formData.recipientName || 'Draft'}.pdf`}
              >
                {({ loading: pdfLoading }) => (
                  <button 
                    disabled={pdfLoading}
                    className="w-full py-4 bg-redMain text-white font-black rounded-2xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <FaDownload /> {pdfLoading ? 'Preparing PDF...' : 'Download PDF Letter'}
                  </button>
                )}
              </PDFDownloadLink>
          </div>
        </div>

        <div className="sticky top-32 h-fit">
           <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 min-h-[600px] flex flex-col font-serif">
              <div className="text-right text-sm text-gray-500 mb-8 lowercase">
                 <p>{formData.senderName || 'Sender Name'}</p>
                 <p>{formData.date}</p>
              </div>
              <div className="mb-8">
                 <p className="font-bold">{formData.recipientName || 'Recipient Name'}</p>
                 <p className="font-bold uppercase mt-4 underline decoration-redMain">RE: {formData.subject}</p>
              </div>
              <div className="flex-1 text-gray-800 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                 {formData.letterContent || 'Letter content will appear here...'}
              </div>
              <div className="mt-12">
                 <p>Sincerely,</p>
                 <p className="font-black text-redMain mt-2 text-xl">{formData.senderName || 'Your Name'}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLetter;
