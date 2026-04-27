import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaExclamationTriangle, FaSave, FaEye, FaDownload } from 'react-icons/fa';
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { RootState, AppDispatch } from '../store/store';
import { saveDocument, aiPolishDocument } from '../features/documents/documentsSlice';
import LetterPDF from "../components/templates/document-templates/LetterPDF";

const NoticeLetter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((state: RootState) => state.documents);

  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    date: new Date().toISOString().split('T')[0],
    recipientName: '',
    recipientAddress: '',
    subject: 'FINAL NOTICE / TERMINATION',
    letterContent: 'This letter serves as formal notice regarding...',
  });

  // Sync Redux state to local form if current document changes
  React.useEffect(() => {
    if (current && current.doc_type === 'NOTICE_LETTER') {
      setFormData(current.content);
    }
  }, [current]);

  const handleSave = () => {
    dispatch(saveDocument({
      id: current?.id,
      doc_type: 'NOTICE_LETTER',
      title: `Notice Letter: ${formData.subject}`,
      content: formData
    })).unwrap()
    .then(() => alert("Notice saved successfully!"))
    .catch((err) => alert(err || "Failed to save notice."));
  };

  const handlePolish = () => {
    if (!current?.id) {
       alert("Please save the notice first to polish with AI!");
       return;
    }
    dispatch(aiPolishDocument(current.id)).unwrap()
    .then(() => alert("AI has polished your notice letter!"))
    .catch((err) => alert(err || "AI Polishing failed."));
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 min-h-screen font-serif">
      <NavLink to="/documents" className="flex items-center text-redMain hover:text-red-700 mb-8 transition-colors font-sans font-bold">
        <FaArrowLeft className="mr-2" /> {t('common.back')}
      </NavLink>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-gray-900 dark:text-gray-100">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-fit font-sans">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl">
                <FaExclamationTriangle className="text-2xl text-redMain" />
              </div>
              <h1 className="text-2xl font-black">Official Notice</h1>
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
             <input type="text" placeholder="Sender Name" value={formData.senderName} onChange={e => setFormData({...formData, senderName: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" />
             <input type="text" placeholder="Recipient Name" value={formData.recipientName} onChange={e => setFormData({...formData, recipientName: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" />
             <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full p-4 bg-red-50 dark:bg-red-900/10 border border-redMain/20 rounded-xl outline-none font-black text-redMain" />
             <textarea rows={10} value={formData.letterContent} onChange={e => setFormData({...formData, letterContent: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" />

             <PDFDownloadLink
                document={<LetterPDF data={{ 
                  applicantName: formData.senderName, 
                  date: formData.date, 
                  recipientName: formData.recipientName, 
                  subject: formData.subject,
                  letterContent: formData.letterContent
                }} />}
                fileName={`Notice_Letter_${formData.recipientName || 'Draft'}.pdf`}
              >
                {({ loading: pdfLoading }) => (
                  <button 
                    disabled={pdfLoading}
                    className="w-full py-4 bg-redMain text-white font-black rounded-2xl shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <FaDownload /> {pdfLoading ? 'Preparing PDF...' : 'Download PDF Notice'}
                  </button>
                )}
              </PDFDownloadLink>
          </div>
        </div>

        <div className="sticky top-32 h-fit">
           <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-xl border-4 border-redMain min-h-[600px] flex flex-col font-serif">
              <div className="border-b-2 border-redMain pb-8 mb-10 text-center font-sans">
                 <h2 className="text-3xl font-black text-redMain tracking-tighter uppercase">Official Notice</h2>
              </div>
              <div className="space-y-6 text-sm md:text-base leading-relaxed overflow-y-auto max-h-[700px]">
                 <div className="flex justify-between items-start">
                    <div>
                       <p className="font-bold underline">FROM:</p>
                       <p>{formData.senderName || 'Sender Name'}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-bold underline">DATE:</p>
                       <p>{formData.date}</p>
                    </div>
                 </div>
                 
                 <div>
                    <p className="font-bold underline mb-2">TO:</p>
                    <p>{formData.recipientName || 'Recipient Name'}</p>
                 </div>

                 <div className="py-4 border-y border-dashed dark:border-gray-700 text-center">
                    <p className="font-black text-lg uppercase underline decoration-redMain decoration-2">{formData.subject}</p>
                 </div>

                 <div className="flex-1 whitespace-pre-line text-gray-800 dark:text-gray-200 italic">
                    {formData.letterContent || 'Notice content will appear here...'}
                 </div>

                 <div className="mt-12 pt-10 border-t flex justify-between dark:border-gray-700 italic font-sans text-xs text-gray-500">
                    <p>FORMAL NOTICE</p>
                    <p>SMARTDOCS COMPLIANCE</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeLetter;
