import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft, FaGavel, FaSave, FaEye, FaDownload, FaFileSignature, FaPlus, FaTrash, FaChevronLeft } from 'react-icons/fa';
import { useDocumentEngine } from '../documents/hooks/useDocumentEngine';
import { notify } from '../utils/notificationService';
import { SmartEditorLayout } from '../components/editor/SmartEditorLayout';
import { DocumentPreviewModal } from '../components/documents/DocumentPreviewModal';
import Button from '../components/formElements/Button';
import { DOCUMENT_REGISTRY } from '../documents/registry';

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
    settings,
    setSettings
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
      deponentName: t('affidavit.sample_data.deponentName'),
      deponentAddress: t('affidavit.sample_data.deponentAddress'),
      deponentOccupation: t('affidavit.sample_data.deponentOccupation'),
      idNumber: t('affidavit.sample_data.idNumber'),
      statements: t('affidavit.sample_data.statements', { returnObjects: true }),
      date: new Date().toISOString().split('T')[0]
    });
    notify.info(t('common.template_loaded'));
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
      title={t('catalog.affidavits_title')}
      subtitle={t('affidavit.legal_instrument')}
      onSave={onSave}
      isSaving={isSaving}
      isValidated={isValidated}
      isPolishing={isPolishing}
      onStartTemplate={onStartTemplate}
      onStartBlank={onStartBlank}
      settings={settings}
      onSettingsChange={setSettings}
      templates={DOCUMENT_REGISTRY['AFFIDAVIT'].templates}
      preview={
        <div className={`bg-white shadow-inner min-h-[850px] flex flex-col font-serif relative overflow-hidden text-left ${settings?.layout === 'compact' ? 'gap-2 p-8' : 'gap-6 p-12'}`}>
          <div className={`text-center ${settings?.layout === 'compact' ? 'mb-8' : 'mb-16'} ${settings?.layout === 'modern' ? 'text-left' : ''}`}>
            <h2 className={`${settings?.layout === 'elegant' ? 'text-3xl' : 'text-2xl'} font-black text-charcoal uppercase tracking-[0.3em] mb-4`}>{t('catalog.affidavits_title')}</h2>
            <div className={`h-1 ${settings?.layout === 'modern' ? 'w-full' : 'w-24 mx-auto'} mb-6`} style={{ backgroundColor: settings?.theme?.primaryColor }} />
            {settings?.layout === 'elegant' && <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mt-[-10px]">{t('common.republic_of_tanzania')}</p>}
          </div>
          <div className={`flex-1 space-y-6 text-charcoal leading-loose ${settings?.layout === 'compact' ? 'text-xs' : 'text-sm'} ${settings?.layout === 'modern' ? 'bg-slate-50/50 p-8 rounded-3xl border-l-8' : ''}`} style={{ borderLeftColor: settings?.layout === 'modern' ? settings?.theme?.primaryColor : 'transparent' }}>
            <p className={`font-bold border-l-4 pl-6 italic ${settings?.layout === 'modern' ? 'border-none pl-0' : ''}`} style={{ borderLeftColor: settings?.theme?.primaryColor }}>
              {t('affidavit.oath_start')} <span className="underline decoration-2" style={{ textDecorationColor: settings?.theme?.primaryColor }}>{formData.deponentName || '____________________'}</span>, {t('affidavit.oath_resident')} {formData.deponentOccupation || '____________________'} {t('affidavit.oath_resident_of')} {formData.deponentAddress || '____________________'} {t('affidavit.oath_end')}
            </p>
            <div className={`space-y-4 pl-6 ${settings?.layout === 'modern' ? 'space-y-8 pl-0' : ''} ${settings?.layout === 'elegant' ? 'space-y-12' : ''}`}>
              {formData.statements.map((stmt: string, idx: number) => (
                <div key={idx} className={`flex gap-4 ${settings?.layout === 'elegant' ? 'flex-col items-center text-center' : ''}`}>
                  <span className={`font-black ${settings?.layout === 'elegant' ? 'w-full text-lg mb-2' : 'w-8'}`} style={{ color: settings?.theme?.primaryColor }}>{idx + 1}.</span>
                  <p className="flex-1 italic">{stmt || '____________________________________________________________________'}</p>
                </div>
              ))}
            </div>
          </div>
          {settings?.layout === 'elegant' && (
             <div className="mt-16 pt-12 border-t flex justify-between items-center px-12" style={{ borderTopColor: settings?.theme?.primaryColor + '20' }}>
                <div className="w-40 border-b border-charcoal pb-1" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('affidavit.commissioner_for_oaths')}</p>
             </div>
          )}
        </div>
      }

    >
      <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: settings?.theme?.primaryColor }} />
         
         <div className="space-y-8">
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">{t('affidavit.deponent_details')}</h3>
             <div className="grid grid-cols-1 gap-6 text-left">
               <div>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('affidavit.full_name')}</label>
                 <input 
                   type="text"
                   value={formData.deponentName}
                   onChange={(e) => setFormData({...formData, deponentName: e.target.value})}
                   className="input-premium"
                   placeholder="e.g. John Doe"
                 />
               </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('affidavit.occupation')}</label>
                     <input 
                       type="text"
                       value={formData.deponentOccupation}
                       onChange={(e) => setFormData({...formData, deponentOccupation: e.target.value})}
                       className="input-premium"
                     />
                   </div>
                   <div>
                     <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('affidavit.id_passport')}</label>
                     <input 
                        type="text" 
                        value={formData.idNumber} 
                        onChange={(e) => setFormData({...formData, idNumber: e.target.value})} 
                        className="input-premium" 
                        placeholder="e.g. 19900101-..."
                      />
                   </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('affidavit.address')}</label>
                     <input type="text" value={formData.deponentAddress} onChange={(e) => setFormData({...formData, deponentAddress: e.target.value})} className="input-premium" />
                   </div>
                   <div>
                     <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('affidavit.issue_date')}</label>
                     <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="input-premium" />
                   </div>
                </div>
             </div>
           </div>

           <div>
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em]">{t('affidavit.statements_fact')}</h3>
                <button onClick={() => setFormData({ ...formData, statements: [...formData.statements, ''] })} className="text-redMain font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                  <FaPlus /> {t('affidavit.add_point')}
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
                      placeholder={t('affidavit.i_state')}
                    />
                    <button onClick={() => setFormData({ ...formData, statements: formData.statements.filter((_: any, i: number) => i !== idx) })} className="p-2 text-gray-300 hover:text-redMain">
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
               label={t('affidavit.ai_polish_statements')} 
               variant="primary"
               icon={<span>✨</span>}
               onClick={onPolish}
               disabled={isPolishing}
               className="w-full"
            />

            <Button 
               label={t('affidavit.finalize')} 
               variant="primary"
               icon={<FaSave />}
               onClick={onSave}
               disabled={isSaving}
               className="w-full mt-4"
            />
         </div>
      </section>
    </SmartEditorLayout>
  );

};

export default Affidavit;
