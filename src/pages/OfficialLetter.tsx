import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaFileAlt, FaEye, FaDownload, FaArrowRight, FaArrowLeft, FaCheck, FaMagic, FaSave } from 'react-icons/fa';
import { useDocumentEngine } from '../documents/hooks/useDocumentEngine';
import { SmartEditorLayout } from '../components/editor/SmartEditorLayout';
import { notify } from '../utils/notificationService';
import Button from '../components/formElements/Button';
import { useTranslation } from 'react-i18next';
import { DOCUMENT_REGISTRY } from '../documents/registry';

const OfficialLetter = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const letterType = queryParams.get('type');

  const getInitialData = () => {
    return {
      senderName: '',
      senderTitle: '',
      senderAddress: '',
      recipientName: '',
      recipientAddress: '',
      date: new Date().toISOString().split('T')[0],
      subject: '',
      body: '',
    };
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
  } = useDocumentEngine(getInitialData(), 'LETTER', {
    sender_name: 'senderName',
    sender_title: 'senderTitle',
    sender_address: 'senderAddress',
    recipient_name: 'recipientName',
    recipient_address: 'recipientAddress',
    subject: 'subject',
    body: 'body'
  });

  const onSave = async () => {
    // Frontend Pre-validation to avoid 400 errors
    if (!formData.recipientName || !formData.subject || !formData.body) {
      notify.error("Please fill in the Recipient, Subject, and Body before finalizing.");
      return;
    }

    try {
      await handleSave(`Letter: ${formData.subject}`, 'FINAL');
      notify.success("Letter Finalized & Exported.");
    } catch (err: any) {
      notify.error(err.response?.data?.message || err.message || "Failed to finalize letter.");
    }
  };
  const onPolish = async () => {
      if (!formData.body) return;
      const polished = await handlePolish(formData.body);
      setFormData({...formData, body: polished});
  };

  const onStartTemplate = () => {
    if (letterType === 'internship-letter') {
      setFormData(t('letter.sample_data_internship', { returnObjects: true }));
      notify.info(t('common.template_loaded'));
      return;
    }

    if (letterType === 'cover-letter') {
      setFormData(t('letter.sample_data_cover_letter', { returnObjects: true }));
      notify.info(t('common.template_loaded'));
      return;
    }

    // Default Standard Template
    setFormData(t('letter.sample_data', { returnObjects: true }));
    notify.info(t('common.template_loaded'));
  };

  const onStartBlank = () => {
    setFormData({
      senderName: '',
      senderTitle: '',
      senderAddress: '',
      recipientName: '',
      recipientAddress: '',
      date: new Date().toISOString().split('T')[0],
      subject: '',
      body: '',
    });
    notify.info("Editor cleared for a fresh start.");
  };

  return (
    <SmartEditorLayout
      title={t('catalog.official_letter_title')}
      subtitle={t('letter.official_correspondence')}
      onSave={onSave}
      isSaving={isSaving}
      isValidated={isValidated}
      isPolishing={isPolishing}
      onStartTemplate={onStartTemplate}
      onStartBlank={onStartBlank}
      settings={settings}
      onSettingsChange={setSettings}
      templates={DOCUMENT_REGISTRY['LETTER'].templates}
      preview={
        <div className={`bg-white p-12 shadow-inner min-h-[850px] flex flex-col font-sans relative text-left text-gray-800 ${settings?.layout === 'compact' ? 'text-[9px] leading-tight gap-4' : 'text-[11px] leading-relaxed gap-6'}`}>
            <div className={`flex justify-between items-start border-b pb-8 ${settings?.layout === 'compact' ? 'mb-6' : 'mb-12'}`} style={{ borderBottomColor: settings?.theme?.primaryColor + '40' }}>
               <div>
                  <h2 className="text-2xl font-black tracking-tighter" style={{ color: settings?.theme?.primaryColor }}>TWENDE</h2>
                  <p className="text-[7px] text-gray-400 uppercase tracking-widest">{t('catalog.official_letter_subtitle')}</p>
               </div>
                <div className="text-right max-w-[200px]">
                   <p className="font-black text-charcoal break-words">{formData.senderName || t('letter.sender_name_placeholder')}</p>
                   <p className="text-gray-400 text-[9px] break-words whitespace-pre-wrap">{formData.senderAddress || t('letter.sender_address_placeholder')}</p>
                </div>
            </div>

            <p className="font-black mb-8">{formData.date}</p>

            <div className={`${settings?.layout === 'modern' ? 'mb-12' : 'mb-8'}`}>
               <p className="font-black text-charcoal text-sm break-words max-w-[250px]">{formData.recipientName || t('letter.recipient_name_placeholder')}</p>
               <p className="text-gray-500 max-w-[200px] break-words whitespace-pre-wrap">{formData.recipientAddress || t('letter.recipient_address_placeholder')}</p>
            </div>

            <div className={`py-2 border-b inline-block max-w-full ${settings?.layout === 'modern' ? 'mb-12' : 'mb-8'}`} style={{ borderBottomColor: settings?.theme?.primaryColor + '40' }}>
               <p className="font-black text-charcoal uppercase tracking-tight break-words max-w-[450px]">RE: {formData.subject || t('letter.subject_placeholder')}</p>
            </div>

            <p className="font-bold mb-4">{t('letter.dear')}</p>
            
            <div className={`flex-1 text-justify ${settings?.layout === 'modern' ? 'leading-loose' : ''}`}>
               <p>{formData.body || t('architect.ai_polishing')}</p>
            </div>

            <div className={`${settings?.layout === 'compact' ? 'mt-6' : 'mt-12'}`}>
               <p>{t('letter.sincerely')}</p>
               <div className={`${settings?.layout === 'compact' ? 'h-6' : 'h-12'}`} />
               <p className="font-black text-charcoal text-sm uppercase">{formData.senderName || t('letter.sender_name_placeholder')}</p>
               <p className="text-gray-400 text-[9px]">{formData.senderTitle || t('letter.sender_title')}</p>
            </div>
        </div>
      }
    >
      <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: settings?.theme?.primaryColor }} />
         
         <div className="space-y-8 text-left">
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">{t('letter.personnel_details')}</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="label-premium">{t('letter.sender_name')}</label>
                  <input 
                    type="text" 
                    value={formData.senderName} 
                    onChange={(e) => setFormData({...formData, senderName: e.target.value})} 
                    className="input-premium" 
                    placeholder={t('letter.sender_name')}
                  />
                </div>
                <div>
                  <label className="label-premium">{t('letter.sender_title')}</label>
                  <input type="text" value={formData.senderTitle} onChange={(e) => setFormData({...formData, senderTitle: e.target.value})} className="input-premium" placeholder="e.g. Manager" />
                </div>
                <div>
                  <label className="label-premium">{t('letter.date')}</label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="input-premium" />
                </div>
             </div>
           </div>

           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">{t('letter.recipient_subject')}</h3>
             <div className="space-y-6">
               <input 
                 type="text" 
                 value={formData.recipientName} 
                 onChange={(e) => setFormData({...formData, recipientName: e.target.value})} 
                 className="input-premium" 
                 placeholder={t('letter.recipient_name')}
               />
               <textarea 
                 value={formData.recipientAddress} 
                 onChange={(e) => setFormData({...formData, recipientAddress: e.target.value})} 
                 className="input-premium h-20" 
                 placeholder={t('letter.recipient_address')}
               />
               <input 
                 type="text" 
                 value={formData.subject} 
                 onChange={(e) => setFormData({...formData, subject: e.target.value})} 
                 className="input-premium font-black" 
                 placeholder={t('letter.letter_subject')}
               />
             </div>
           </div>

           <div>
             <div className="flex justify-between items-center mb-8 border-b pb-4">
               <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em]">{t('letter.letter_content')}</h3>
               <button 
                  onClick={onPolish}
                  disabled={isPolishing || !formData.body}
                  className="text-redMain font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:opacity-70"
               >
                  <FaMagic /> {t('letter.ai_polish_body')}
               </button>
             </div>
             <textarea 
               value={formData.body} 
               onChange={(e) => setFormData({...formData, body: e.target.value})} 
               className="input-premium h-64 text-justify" 
               placeholder={t('letter.write_here')}
             />
           </div>

           <Button 
               label={t('letter.finalize')} 
               variant="primary"
               icon={<FaSave />}
               onClick={onSave}
               disabled={isSaving}
               className="w-full"
            />
         </div>
      </section>
    </SmartEditorLayout>
  );
};

export default OfficialLetter;