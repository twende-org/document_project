import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft, FaGavel, FaSave, FaEye, FaDownload, FaFileSignature, FaPlus, FaTrash, FaChevronLeft } from 'react-icons/fa';
import { useDocumentEngine } from '../documents/hooks/useDocumentEngine';
import { notify } from '../utils/notificationService';
import { SmartEditorLayout } from '../components/editor/SmartEditorLayout';
import { DocumentPreviewModal } from '../components/documents/DocumentPreviewModal';
import Button from '../components/formElements/Button';

const Affidavit = () => {
  const { t } = useTranslation();
  const [showPreview, setShowPreview] = useState(false);

  const initialData = {
    deponentName: '',
    deponentAddress: '',
    deponentOccupation: '',
    idNumber: '',
    statements: [''],
    date: new Date().toISOString().split('T')[0]
  };

  const {
    formData,
    setFormData,
    handleSave,
    handlePolish,
    isSaving,
    isPolishing,
    isValidated,
  } = useDocumentEngine<any>(initialData, 'AFFIDAVIT', {
    declarant_name: 'deponentName',
    id_number: 'idNumber',
    facts: 'statements'
  });

  const onSave = async () => {
    if (!formData.deponentName || !formData.idNumber || !formData.statements.some((s: string) => s.trim().length > 0)) {
      notify.error("Please provide the Deponent Name, ID Number, and at least one Statement.");
      return;
    }

    try {
      await handleSave(`Affidavit for ${formData.deponentName}`, 'FINAL');
      notify.success("Affidavit Finalized & Exported.");
    } catch (err: any) {
      notify.error(err.response?.data?.message || err.message || "Failed to finalize affidavit.");
    }
  };
  const onPolish = async () => {
      if (!formData.statements.some((s: string) => s.length > 0)) return;
      const indexToPolish = formData.statements.findIndex((s: string) => s.length > 0);
      const polished = await handlePolish(formData.statements[indexToPolish]);
      const newStatements = [...formData.statements];
      newStatements[indexToPolish] = polished;
      setFormData({...formData, statements: newStatements});
  };

  const onStartTemplate = () => {
    setFormData({
      deponentName: 'John Doe',
      deponentAddress: 'P.O. Box 123, Dar es Salaam',
      deponentOccupation: 'Business Consultant',
      idNumber: '19900101-12345-00001-20',
      statements: [
        'That I am the deponent herein and thus well-versed with the facts of this matter.',
        'That this affidavit is made in support of my application for verification of documents.',
        'That whatever is stated herein is true to the best of my knowledge and belief.'
      ],
      date: new Date().toISOString().split('T')[0]
    });
    notify.info("Standard Affidavit template loaded.");
  };

  const onStartBlank = () => {
    setFormData({
      deponentName: '',
      deponentAddress: '',
      deponentOccupation: '',
      idNumber: '',
      statements: [''],
      date: new Date().toISOString().split('T')[0]
    });
    notify.info("Editor cleared for a fresh start.");
  };

  return (
    <SmartEditorLayout
      title="Affidavit Architect"
      subtitle="Legal Instrument"
      onSave={onSave}
      isSaving={isSaving}
      isValidated={isValidated}
      isPolishing={isPolishing}
      onStartTemplate={onStartTemplate}
      onStartBlank={onStartBlank}
      preview={
        <div className="bg-white p-12 shadow-inner min-h-[850px] flex flex-col font-serif relative overflow-hidden text-left">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-black text-charcoal uppercase tracking-[0.3em] mb-4">Affidavit</h2>
            <div className="w-24 h-1 bg-redMain mx-auto mb-6" />
          </div>
          <div className="flex-1 space-y-6 text-charcoal leading-loose text-sm">
            <p className="font-bold border-l-4 border-redMain pl-6 italic">
              I, {formData.deponentName || '____________________'}, a {formData.deponentOccupation || '____________________'} and resident of {formData.deponentAddress || '____________________'} do hereby make oath and state as follows:
            </p>
            <div className="space-y-4 pl-6">
              {formData.statements.map((stmt: string, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <span className="font-black text-redMain w-8">{idx + 1}.</span>
                  <p className="flex-1">{stmt || '____________________________________________________________________'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-redMain to-charcoal" />
         
         <div className="space-y-8">
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">Deponent Details</h3>
             <div className="grid grid-cols-1 gap-6 text-left">
               <div>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Full Deponent Name</label>
                 <input 
                   type="text"
                   value={formData.deponentName}
                   onChange={(e) => setFormData({...formData, deponentName: e.target.value})}
                   className="input-premium"
                   placeholder="e.g. John Doe"
                 />
               </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Occupation</label>
                     <input 
                       type="text"
                       value={formData.deponentOccupation}
                       onChange={(e) => setFormData({...formData, deponentOccupation: e.target.value})}
                       className="input-premium"
                     />
                   </div>
                   <div>
                     <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">ID/Passport Number</label>
                     <input 
                        type="text" 
                        value={formData.idNumber} 
                        onChange={(e) => setFormData({...formData, idNumber: e.target.value})} 
                        className="input-premium" 
                        placeholder="e.g. 19900101-..."
                      />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Address</label>
                     <input type="text" value={formData.deponentAddress} onChange={(e) => setFormData({...formData, deponentAddress: e.target.value})} className="input-premium" />
                   </div>
                   <div>
                     <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Issue Date</label>
                     <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="input-premium" />
                   </div>
                </div>
             </div>
           </div>

           <div>
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em]">Statements of Fact</h3>
                <button onClick={() => setFormData({ ...formData, statements: [...formData.statements, ''] })} className="text-redMain font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                  <FaPlus /> Add Point
                </button>
              </div>
              <div className="space-y-4">
                {formData.statements.map((stmt: string, idx: number) => (
                  <div key={idx} className="flex gap-4 group items-start">
                    <textarea 
                      value={stmt}
                      onChange={(e) => {
                        const newStatements = [...formData.statements];
                        newStatements[idx] = e.target.value;
                        setFormData({ ...formData, statements: newStatements });
                      }}
                      className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-bold text-sm min-h-[100px] text-left"
                      placeholder="I state that..."
                    />
                    <button onClick={() => setFormData({ ...formData, statements: formData.statements.filter((_: any, i: number) => i !== idx) })} className="p-2 text-gray-300 hover:text-redMain">
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
               label="AI Polish Statements" 
               variant="primary"
               icon={<span>✨</span>}
               onClick={onPolish}
               disabled={isPolishing}
               className="w-full"
            />
         </div>
      </section>
    </SmartEditorLayout>
  );

};

export default Affidavit;
