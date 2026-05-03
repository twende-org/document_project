import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaPlus, FaTrash, FaEye, FaDownload, FaSave, FaChevronLeft } from 'react-icons/fa';
import { useDocumentEngine } from '../documents/hooks/useDocumentEngine';
import { notify } from '../utils/notificationService';
import { SmartEditorLayout } from '../components/editor/SmartEditorLayout';
import { DocumentPreviewModal } from '../components/documents/DocumentPreviewModal';
import Button from '../components/formElements/Button';
import { DOCUMENT_REGISTRY } from '../documents/registry';

const EventProgram = () => {
  const { t } = useTranslation();
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
  } = useDocumentEngine({
    eventTitle: 'Annual General Meeting',
    date: new Date().toISOString().split('T')[0],
    venue: 'Convention Center',
    items: [
      { time: '09:00', activity: 'Arrival & Registration' },
      { time: '10:00', activity: 'Introductory Remarks' }
    ]
  }, 'EVENT_PROGRAM', {
    event_name: 'eventTitle',
    schedule: 'items'
  });

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { time: '', activity: '' }] });
  };

  const removeItem = (index: number) => {
    if (formData.items.length === 1) return;
    setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...formData.items];
    (newItems[index] as any)[field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const onSave = async () => {
    if (!formData.eventTitle || !formData.date || !formData.items.some(i => i.activity.trim().length > 0)) {
      notify.error("Please provide the Event Title, Date, and at least one activity.");
      return;
    }

    try {
      await handleSave(`Event: ${formData.eventTitle}`, 'FINAL');
      notify.success("Program Finalized & Exported.");
    } catch (err: any) {
      notify.error(err.response?.data?.message || err.message || "Failed to finalize program.");
    }
  };
  const onPolish = async () => {
      const indexToPolish = formData.items.findIndex(item => item.activity.length > 5);
      if (indexToPolish === -1) return;
      
      const polished = await handlePolish(formData.items[indexToPolish].activity);
      const newItems = [...formData.items];
      newItems[indexToPolish].activity = polished;
      setFormData({...formData, items: newItems});
  };

  const onStartTemplate = () => {
    setFormData(t('event.sample_data', { returnObjects: true }) as any);
    notify.info(t('common.template_loaded'));
  };

  const onStartBlank = () => {
    setFormData({
      eventTitle: '',
      date: new Date().toISOString().split('T')[0],
      venue: '',
      items: [{ time: '08:00 AM', activity: '' }]
    });
    notify.info("Editor cleared for a fresh start.");
  };

  return (
    <SmartEditorLayout
      title={t('catalog.event_program_title')}
      subtitle={t('event.sequence_service')}
      onSave={onSave}
      isSaving={isSaving}
      isValidated={isValidated}
      isPolishing={isPolishing}
      onStartTemplate={onStartTemplate}
      onStartBlank={onStartBlank}
      settings={settings}
      onSettingsChange={setSettings}
      templates={DOCUMENT_REGISTRY['EVENT_PROGRAM'].templates}
      preview={
        <div className={`bg-white shadow-inner min-h-[850px] flex flex-col font-sans relative overflow-hidden text-left ${settings?.layout === 'compact' ? 'gap-4 p-8' : 'gap-12 p-12'}`}>
            <div className={`text-center ${settings?.layout === 'compact' ? 'mb-6' : 'mb-12'} ${settings?.layout === 'modern' ? 'text-left border-l-8 pl-6' : ''}`} style={{ borderLeftColor: settings?.layout === 'modern' ? settings?.theme?.primaryColor : 'transparent' }}>
              <h2 className={`${settings?.layout === 'compact' ? 'text-2xl' : 'text-3xl'} font-black text-charcoal uppercase tracking-tighter leading-none mb-4 break-words max-w-full`}>
                {formData.eventTitle || t('event.event_program_placeholder')}
              </h2>
              <div className={`flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest ${settings?.layout === 'modern' ? 'justify-start' : 'justify-center'}`}>
                 <span className="break-words max-w-[150px]">{formData.date}</span>
                 <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: settings?.theme?.primaryColor }} />
                 <span className="break-words max-w-[200px]">{formData.venue}</span>
              </div>
            </div>

            <div className={`flex-1 max-w-4xl mx-auto w-full ${settings?.layout === 'compact' ? 'grid grid-cols-2 gap-x-12 gap-y-4' : 'flex flex-col space-y-8'} ${settings?.layout === 'elegant' ? 'items-center' : ''}`}>
               {formData.items.map((item, idx) => (
                 <div key={idx} className={`flex gap-6 group animate-fade-in relative ${settings?.layout === 'compact' ? 'pl-4' : 'pl-8'} ${settings?.layout === 'elegant' ? 'flex-col items-center pl-0' : ''}`}>
                    {settings?.layout !== 'elegant' && (
                      <>
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100 rounded-full" />
                        <div className="absolute left-[-5px] top-4 w-3 h-3 bg-white border-2 rounded-full" style={{ borderColor: settings?.theme?.primaryColor }} />
                      </>
                    )}
                    
                    <div className={`${settings?.layout === 'elegant' ? 'w-full text-center' : (settings?.layout === 'compact' ? 'w-12' : 'w-16')} shrink-0`}>
                       <p className={`${settings?.layout === 'elegant' ? 'text-lg' : 'text-sm'} font-black tracking-tighter`} style={{ color: settings?.theme?.primaryColor }}>{item.time || '--:--'}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className={`${settings?.layout === 'compact' ? 'text-[10px] line-clamp-2' : 'text-md'} font-black text-charcoal uppercase tracking-tighter break-words`}>
                          {item.activity || t('event.activity_placeholder')}
                       </p>
                    </div>
                    {settings?.layout === 'elegant' && <div className="w-12 h-0.5 bg-slate-100 mt-4" />}
                 </div>
               ))}
            </div>


        </div>
      }

    >
      <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: settings?.theme?.primaryColor }} />
         
         <div className="space-y-8 text-left">
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">{t('event.general_settings')}</h3>
             <div className="grid grid-cols-1 gap-6 text-left">
               <div>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('event.event_title')}</label>
                 <input 
                   type="text"
                   value={formData.eventTitle}
                   onChange={(e) => setFormData({...formData, eventTitle: e.target.value})}
                   className="input-premium"
                   placeholder="e.g. Wedding Reception"
                 />
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('event.event_date')}</label>
                    <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="input-premium" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('event.venue')}</label>
                    <input type="text" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} className="input-premium" />
                  </div>
               </div>
             </div>
           </div>

           <div>
             <div className="flex justify-between items-center mb-8 border-b pb-4">
               <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em]">{t('event.program_flow')}</h3>
               <button onClick={addItem} className="text-redMain font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                 <FaPlus /> {t('event.add_item')}
               </button>
             </div>

             <div className="space-y-4">
               {formData.items.map((item, idx) => (
                 <div key={idx} className="flex flex-col sm:flex-row gap-4 group sm:items-start">
                    <input 
                      type="text"
                      placeholder="00:00"
                      value={item.time}
                      onChange={(e) => handleItemChange(idx, 'time', e.target.value)}
                      className="w-full sm:w-24 p-4 bg-slate-50 border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-black text-center text-sm"
                    />
                    <div className="flex gap-4 w-full">
                       <input 
                         type="text"
                         value={item.activity}
                         onChange={(e) => handleItemChange(idx, 'activity', e.target.value)}
                         className="flex-1 p-4 bg-slate-50 border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-bold text-sm text-left"
                         placeholder={t('event.activity')}
                       />
                       <button onClick={() => removeItem(idx)} className="p-2 text-gray-300 hover:text-redMain">
                         <FaTrash />
                       </button>
                    </div>
                 </div>
               ))}
             </div>
           </div>
           
           <Button 
               label={t('event.ai_polish')} 
               variant="primary"
               icon={<span>✨</span>}
               onClick={onPolish}
               disabled={isPolishing}
               className="w-full"
            />

           <Button 
               label={t('event.finalize')} 
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

export default EventProgram;
