import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft, FaGavel, FaSave, FaEye, FaDownload, FaFileSignature, FaPlus, FaTrash, FaChevronLeft } from 'react-icons/fa';
import { useDocumentEngine } from '../documents/hooks/useDocumentEngine';
import Button from '../components/formElements/Button';

const Affidavit = () => {
  const { t } = useTranslation();
  const [showPreview, setShowPreview] = useState(false);

  const initialData = {
    deponentName: '',
    deponentAddress: '',
    deponentOccupation: '',
    statements: [''],
    date: new Date().toISOString().split('T')[0]
  };

  const {
    formData,
    setFormData,
    updateField,
    handleSave,
    handlePolish,
    isSaving,
    isPolishing,
    isValidated,
    error
  } = useDocumentEngine<any>(initialData, 'AFFIDAVIT');

  const onSave = async () => {
    try {
      await handleSave(`Affidavit for ${formData.deponentName || 'Deponent'}`, 'FINAL');
      alert("Affidavit Finalized & Downloaded.");
    } catch (err) {}
  };

  const onPolish = async () => {
      if (!formData.statements.some((s: string) => s.length > 0)) return;
      const indexToPolish = formData.statements.findIndex((s: string) => s.length > 0);
      const polished = await handlePolish(formData.statements[indexToPolish]);
      const newStatements = [...formData.statements];
      newStatements[indexToPolish] = polished;
      setFormData({...formData, statements: newStatements});
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
             <NavLink to="/documents" className="flex items-center text-redMain font-black uppercase text-xs tracking-widest hover:translate-x-[-4px] transition-transform">
               <FaArrowLeft className="mr-2" /> {t('common.back')}
             </NavLink>
             <h1 className="text-4xl md:text-6xl font-black text-charcoal dark:text-white uppercase tracking-tighter leading-none">
                Affidavit <span className="text-redMain">Architect</span>
             </h1>
          </div>
          <div className="flex gap-4">
             <Button 
               label={showPreview ? "Back to Edit" : "Live Preview"} 
               variant="secondary"
               icon={showPreview ? <FaChevronLeft /> : <FaEye />}
               onClick={() => setShowPreview(!showPreview)}
               className="lg:hidden"
             />
              <Button 
                label="Generate & Finalize" 
                variant="secondary"
                icon={<FaSave />}
                onClick={onSave}
                disabled={isSaving}
              />
              <Button 
                label="AI Polish" 
                variant="primary"
                icon={<span>✨</span>}
                onClick={onPolish}
                disabled={isPolishing}
                className="shadow-red-500/20"
              />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Side */}
          <main className={`lg:col-span-5 space-y-8 animate-fade-in ${showPreview ? "hidden lg:block" : "block"}`}>
            <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-redMain to-charcoal" />
               
               <div className="space-y-8">
                 <div>
                   <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">Deponent Details</h3>
                   <div className="grid grid-cols-1 gap-6">
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Full Deponent Name</label>
                       <input 
                         type="text"
                         value={formData.deponentName}
                         onChange={(e) => setFormData({...formData, deponentName: e.target.value})}
                         className="input-premium"
                         placeholder="e.g. John Doe / Jane Smith"
                       />
                     </div>
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Address / Residence</label>
                       <input 
                         type="text"
                         value={formData.deponentAddress}
                         onChange={(e) => setFormData({...formData, deponentAddress: e.target.value})}
                         className="input-premium"
                         placeholder="Street, City, P.O. Box"
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
                            placeholder="e.g. Civil Servant"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Issue Date</label>
                          <input 
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="input-premium"
                          />
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
                        <div key={idx} className="flex gap-4 group animate-fade-in">
                          <div className="pt-4">
                             <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-charcoal">
                                {idx + 1}
                             </span>
                          </div>
                          <div className="flex-1">
                             <textarea 
                               value={stmt}
                               onChange={(e) => {
                                 const newStatements = [...formData.statements];
                                 newStatements[idx] = e.target.value;
                                 setFormData({ ...formData, statements: newStatements });
                               }}
                               className="w-full p-4 bg-slate-50 dark:bg-charcoal border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-bold text-sm min-h-[100px]"
                               placeholder="I state that..."
                             />
                          </div>
                          <div className="pt-4">
                            <button onClick={() => {
                                if (formData.statements.length === 1) return;
                                const newStatements = formData.statements.filter((_: any, i: number) => i !== idx);
                                setFormData({ ...formData, statements: newStatements });
                            }} className="p-2 text-gray-300 hover:text-redMain transition-colors opacity-0 group-hover:opacity-100">
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </section>
          </main>

          {/* Preview Side */}
          <aside className={`lg:col-span-7 sticky top-32 transition-all duration-500 ${showPreview ? "block" : "hidden lg:block"}`}>
            <div className="flex items-center justify-between mb-6 px-4">
               <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-redMain animate-ping" />
                 Legal Preview
               </h3>
               {/* Note: In high-fidelity mode, we rely on Generate & Finalize for backend PDF. Client-side preview is for editing. */}
            </div>
            
            <div className="rounded-[2.5rem] bg-slate-200 p-8 shadow-2xl border-4 border-white overflow-hidden min-h-[900px]">
               <div className="bg-white p-12 md:p-20 shadow-inner min-h-[850px] flex flex-col font-serif relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12">
                     <FaGavel className="text-[15rem] text-charcoal" />
                  </div>

                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-charcoal uppercase tracking-[0.3em] mb-4">Affidavit</h2>
                    <div className="w-24 h-1 bg-redMain mx-auto mb-6" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                      IN THE MATTER OF THE OATHS AND STATUTORY DECLARATIONS ACT (CHAPTER 15, LAWS OF TANZANIA)
                    </p>
                  </div>

                  <div className="flex-1 space-y-10 text-charcoal leading-loose text-lg">
                    <p className="font-bold border-l-4 border-redMain pl-6 italic">
                      I, {formData.deponentName || '____________________'}, a {formData.deponentOccupation || '____________________'} and resident of {formData.deponentAddress || '____________________'} do hereby make oath and state as follows:
                    </p>

                    <div className="space-y-8 pl-6">
                      {formData.statements.map((stmt: string, idx: number) => (
                        <div key={idx} className="flex gap-4">
                          <span className="font-black text-redMain w-8">{idx + 1}.</span>
                          <p className="flex-1">{stmt || '____________________________________________________________________'}</p>
                        </div>
                      ))}
                      <div className="flex gap-4">
                        <span className="font-black text-redMain w-8">{formData.statements.length + 1}.</span>
                        <p className="flex-1">That what is stated hereinabove is true to the best of my knowledge, information, and belief.</p>
                      </div>
                    </div>

                    <div className="mt-32 grid grid-cols-2 gap-20 pt-20 border-t-2 border-slate-50">
                      <div className="space-y-16">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sworn by the said deponent:</p>
                        <div className="border-b-2 border-charcoal pb-2 mt-auto">
                          <p className="font-black text-charcoal uppercase tracking-tighter">{formData.deponentName || 'DEPONENT SIGNATURE'}</p>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-charcoal">Deponent</p>
                      </div>
                      <div className="text-right space-y-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Before me:</p>
                        <div className="w-40 h-40 border-4 border-redMain/10 rounded-[2rem] flex items-center justify-center ml-auto bg-slate-50 relative">
                           <div className="text-[8px] font-black text-redMain/20 uppercase tracking-[0.4em] text-center rotate-[-45deg]">
                              Commissioner<br/>For Oaths<br/>Stamp
                           </div>
                        </div>
                        <p className="text-[10px] font-black text-charcoal uppercase tracking-widest">Date: {formData.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-20 pt-12 text-center opacity-30">
                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-charcoal">Precision Legal Architect by Twende Documents</p>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Affidavit;
