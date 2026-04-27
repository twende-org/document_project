import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaFileContract, FaSave, FaEye, FaPlus, FaTrash, FaDownload } from 'react-icons/fa';
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { RootState, AppDispatch } from '../store/store';
import { saveDocument, aiPolishDocument } from '../features/documents/documentsSlice';
import ContractPDF from "../components/templates/document-templates/ContractPDF";

const PersonalContract = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((state: RootState) => state.documents);

  const [formData, setFormData] = React.useState({
    partyAName: '',
    partyAAddress: '',
    partyBName: '',
    partyBAddress: '',
    contractDate: new Date().toISOString().split('T')[0],
    subject: '',
    terms: [''],
    terminationClause: 'Either party may terminate this agreement with 30 days written notice.'
  });

  const [preview, setPreview] = React.useState(false);

  // Sync Redux state to local form if current document changes
  React.useEffect(() => {
    if (current && current.doc_type === 'CONTRACT') {
      setFormData(current.content);
    }
  }, [current]);

  const addTerm = () => {
    setFormData({ ...formData, terms: [...formData.terms, ''] });
  };

  const handleTermChange = (index: number, value: string) => {
    const newTerms = [...formData.terms];
    newTerms[index] = value;
    setFormData({ ...formData, terms: newTerms });
  };

  const handleSave = async () => {
    dispatch(saveDocument({
      id: current?.id,
      doc_type: 'CONTRACT',
      title: `Contract: ${formData.subject || 'Agreement'}`,
      content: formData
    })).unwrap()
    .then(() => alert("Contract saved successfully!"))
    .catch((err) => alert(err || "Failed to save contract."));
  };

  const handlePolish = async () => {
    if (!current?.id) {
      alert("Please save the contract first!");
      return;
    }
    dispatch(aiPolishDocument(current.id)).unwrap()
    .then(() => alert("AI has polished your contract terms!"))
    .catch((err) => alert(err || "AI Polishing failed."));
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 min-h-screen">
      <NavLink to="/documents" className="flex items-center text-redMain hover:text-red-700 mb-8 transition-colors font-bold">
        <FaArrowLeft className="mr-2" /> {t('common.back')}
      </NavLink>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Column */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-fit">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl">
                <FaFileContract className="text-2xl text-redMain" />
              </div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">Contract Builder</h1>
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

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subject / Title</label>
                <input 
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none dark:text-white"
                  placeholder="e.g. Sales Agreement"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Party A (Full Name)</label>
                <input 
                  type="text"
                  value={formData.partyAName}
                  onChange={(e) => setFormData({...formData, partyAName: e.target.value})}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Party B (Full Name)</label>
                <input 
                  type="text"
                  value={formData.partyBName}
                  onChange={(e) => setFormData({...formData, partyBName: e.target.value})}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Contract Date</label>
                <input type="date" value={formData.contractDate} onChange={e => setFormData({...formData, contractDate: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none dark:text-white" />
              </div>
            </div>

            <div className="pt-6 border-t dark:border-gray-700">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold dark:text-white">Key Terms & Conditions</h3>
                  <button onClick={addTerm} className="text-redMain font-bold hover:underline flex items-center gap-1"><FaPlus /> Add Term</button>
               </div>
               {formData.terms.map((term, idx) => (
                 <div key={idx} className="flex gap-2 mb-2">
                    <textarea 
                      className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none dark:text-white" 
                      value={term} 
                      onChange={e => handleTermChange(idx, e.target.value)} 
                      placeholder={`Term ${idx + 1}`}
                    />
                 </div>
               ))}
            </div>

            <button onClick={() => setPreview(true)} className="w-full py-4 bg-redMain text-white font-black rounded-2xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 mt-8">
              <FaEye /> Preview Agreement
            </button>
          </div>
        </div>

        {/* Preview Column */}
        <div className="sticky top-32 h-fit">
          <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 min-h-[600px] flex flex-col font-serif">
            <h2 className="text-2xl font-black text-center mb-10 border-b pb-4 dark:border-gray-700">CONTRACT AGREEMENT</h2>
            
            {preview ? (
              <div className="flex-1 space-y-6 text-gray-800 dark:text-gray-300 text-sm leading-relaxed overflow-y-auto max-h-[700px]">
                <p>This agreement is made on <span className="font-bold underline">{formData.contractDate}</span> between:</p>
                
                <div className="grid grid-cols-2 gap-8 italic">
                  <div>
                    <p className="font-bold not-italic underline">Party A:</p>
                    <p>{formData.partyAName || '________________'}</p>
                    <p>{formData.partyAAddress || '________________'}</p>
                  </div>
                  <div>
                    <p className="font-bold not-italic underline">Party B:</p>
                    <p>{formData.partyBName || '________________'}</p>
                    <p>{formData.partyBAddress || '________________'}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="font-black text-lg mb-4 uppercase text-redMain">Subject: {formData.subject}</p>
                  <div className="space-y-4">
                    {formData.terms.map((term, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="font-bold">{idx + 1}.</span>
                        <p>{term || '________________________________________________________________'}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t pt-4">
                  <p className="font-bold mb-2">Termination:</p>
                  <p>{formData.terminationClause}</p>
                </div>

                <div className="mt-20 grid grid-cols-2 gap-20 pt-10 border-t border-dashed dark:border-gray-700">
                   <div className="text-center">
                     <div className="h-0.5 bg-gray-400 w-full mb-2" />
                     <p className="text-xs font-bold">Party A Signature</p>
                   </div>
                   <div className="text-center">
                     <div className="h-0.5 bg-gray-400 w-full mb-2" />
                     <p className="text-xs font-bold">Party B Signature</p>
                   </div>
                </div>

                <div className="mt-12 flex justify-center no-print">
                   <PDFDownloadLink
                     document={<ContractPDF data={{ 
                       partyAName: formData.partyAName,
                       partyAAddress: formData.partyAAddress,
                       partyBName: formData.partyBName,
                       partyBAddress: formData.partyBAddress,
                       contractSubject: formData.subject,
                       terms: formData.terms,
                       date: formData.contractDate
                     }} />}
                     fileName={`Contract_${formData.subject || 'Draft'}.pdf`}
                   >
                     {({ loading: pdfLoading }) => (
                       <button 
                         disabled={pdfLoading}
                         className="bg-redMain text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-black transition-all"
                        >
                         <FaDownload /> {pdfLoading ? 'Loading...' : 'Download as PDF'}
                       </button>
                     )}
                   </PDFDownloadLink>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 italic">
                <FaFileContract className="text-8xl mb-6 opacity-5" />
                Input the contractual parties and terms to view your agreement here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalContract;
