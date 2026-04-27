import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaPlus, FaTrash, FaEye, FaDownload, FaSave, FaChevronLeft } from 'react-icons/fa';
import { useDocumentEngine } from '../documents/hooks/useDocumentEngine';
import { notify } from '../utils/notificationService';
import { SmartEditorLayout } from '../components/editor/SmartEditorLayout';
import { DocumentPreviewModal } from '../components/documents/DocumentPreviewModal';
import Button from '../components/formElements/Button';

const EventProgram = () => {
  const { t } = useTranslation();
  const {
    formData,
    setFormData,
    handleSave,
    handlePolish,
    isSaving,
    isPolishing,
    isValidated
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
    setFormData({
      eventTitle: 'COMMUNITY HARVEST FESTIVAL 2024',
      date: new Date().toISOString().split('T')[0],
      venue: 'Main Community Hall, Victoria',
      items: [
        { time: '09:00 AM', activity: 'Opening Prayers and Welcoming Remarks' },
        { time: '10:30 AM', activity: 'Cultural Performance: Traditional Dance Group' },
        { time: '12:00 PM', activity: 'Exhibition Tour and Product Showcasing' },
        { time: '01:30 PM', activity: 'Lunch Break and Networking Session' },
        { time: '03:00 PM', activity: 'Awards Ceremony and Closing Statements' }
      ]
    });
    notify.info("Standard Event template loaded.");
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
      title="Event Architect"
      subtitle="Sequence of Service"
      onSave={onSave}
      isSaving={isSaving}
      isValidated={isValidated}
      isPolishing={isPolishing}
      onStartTemplate={onStartTemplate}
      onStartBlank={onStartBlank}
      preview={
        <div className="bg-white p-12 shadow-inner min-h-[850px] flex flex-col font-sans relative overflow-hidden text-left">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-charcoal uppercase tracking-tighter leading-none mb-4">
                {formData.eventTitle || 'Event Program'}
              </h2>
              <div className="flex items-center justify-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                 <span>{formData.date}</span>
                 <div className="w-1 h-1 rounded-full bg-redMain" />
                 <span>{formData.venue}</span>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-auto w-full space-y-8">
               {formData.items.map((item, idx) => (
                 <div key={idx} className="flex gap-8 group animate-fade-in relative pl-8">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100 rounded-full" />
                    <div className="absolute left-[-5px] top-4 w-3 h-3 bg-white border-2 border-redMain rounded-full" />
                    
                    <div className="w-16 shrink-0">
                       <p className="text-sm font-black text-redMain tracking-tighter">{item.time || '--:--'}</p>
                    </div>
                    <div className="flex-1">
                       <p className="text-md font-black text-charcoal uppercase tracking-tighter">
                          {item.activity || 'Activity details...'}
                       </p>
                    </div>
                 </div>
               ))}
            </div>
        </div>
      }
    >
      <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-redMain to-charcoal" />
         
         <div className="space-y-8">
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">General Settings</h3>
             <div className="grid grid-cols-1 gap-6 text-left">
               <div>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Event Title</label>
                 <input 
                   type="text"
                   value={formData.eventTitle}
                   onChange={(e) => setFormData({...formData, eventTitle: e.target.value})}
                   className="input-premium"
                   placeholder="e.g. Wedding Reception"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Event Date</label>
                    <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="input-premium" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Venue</label>
                    <input type="text" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} className="input-premium" />
                  </div>
               </div>
             </div>
           </div>

           <div>
             <div className="flex justify-between items-center mb-8 border-b pb-4">
               <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em]">Program Flow</h3>
               <button onClick={addItem} className="text-redMain font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                 <FaPlus /> Add Item
               </button>
             </div>

             <div className="space-y-4">
               {formData.items.map((item, idx) => (
                 <div key={idx} className="flex gap-4 group items-start">
                    <input 
                      type="text"
                      placeholder="00:00"
                      value={item.time}
                      onChange={(e) => handleItemChange(idx, 'time', e.target.value)}
                      className="w-24 p-4 bg-slate-50 border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-black text-center text-sm"
                    />
                    <input 
                      type="text"
                      value={item.activity}
                      onChange={(e) => handleItemChange(idx, 'activity', e.target.value)}
                      className="flex-1 p-4 bg-slate-50 border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-bold text-sm text-left"
                      placeholder="Activity"
                    />
                    <button onClick={() => removeItem(idx)} className="p-2 text-gray-300 hover:text-redMain">
                      <FaTrash />
                    </button>
                 </div>
               ))}
             </div>
           </div>
           
           <Button 
               label="AI Polish Program" 
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

export default EventProgram;
