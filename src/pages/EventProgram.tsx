import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaCalendarAlt, FaPlus, FaTrash, FaEye, FaDownload, FaSave, FaChevronLeft } from 'react-icons/fa';
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { RootState, AppDispatch } from '../store/store';
import { saveDocument, aiPolishDocument } from '../features/documents/documentsSlice';
import EventProgramPDF from "../components/templates/document-templates/EventProgramPDF";
import Button from '../components/formElements/Button';

const EventProgram = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((state: RootState) => state.documents);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    eventTitle: 'Annual General Meeting',
    date: new Date().toISOString().split('T')[0],
    venue: 'Convention Center',
    items: [
      { time: '09:00', activity: 'Arrival & Registration' },
      { time: '10:00', activity: 'Introductory Remarks' }
    ]
  });

  React.useEffect(() => {
    if (current && current.doc_type === 'EVENT_PROGRAM') {
      setFormData(current.content);
    }
  }, [current]);

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

  const handleSave = () => {
    dispatch(saveDocument({
      id: current?.id,
      doc_type: 'EVENT_PROGRAM',
      title: `Event Program: ${formData.eventTitle}`,
      content: formData
    })).unwrap()
    .then(() => alert("Program saved successfully!"))
    .catch((err) => alert(err || "Failed to save program."));
  };

  const handlePolish = () => {
    if (!current?.id) {
       alert("Please save the program first to polish with AI!");
       return;
    }
    dispatch(aiPolishDocument(current.id)).unwrap()
    .then(() => alert("AI has polished your event program!"))
    .catch((err) => alert(err || "AI Polishing failed."));
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
               Event <span className="text-redMain">Architect</span>
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
               label="Save Draft" 
               variant="secondary"
               icon={<FaSave />}
               onClick={handleSave}
               disabled={loading}
             />
             <Button 
               label="AI Polish" 
               variant="primary"
               icon={<span>✨</span>}
               onClick={handlePolish}
               disabled={loading}
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
                   <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">General Settings</h3>
                   <div className="grid grid-cols-1 gap-6">
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
                          <input 
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="input-premium"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Venue</label>
                          <input 
                            type="text"
                            value={formData.venue}
                            onChange={(e) => setFormData({...formData, venue: e.target.value})}
                            className="input-premium"
                            placeholder="Location"
                          />
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
                       <div key={idx} className="flex gap-4 group animate-fade-in items-start">
                         <div className="w-24">
                           <input 
                             type="text"
                             placeholder="00:00"
                             value={item.time}
                             onChange={(e) => handleItemChange(idx, 'time', e.target.value)}
                             className="w-full p-4 bg-slate-50 dark:bg-charcoal border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-black text-center text-sm"
                           />
                         </div>
                         <div className="flex-1">
                            <input 
                              type="text"
                              value={item.activity}
                              onChange={(e) => handleItemChange(idx, 'activity', e.target.value)}
                              className="w-full p-4 bg-slate-50 dark:bg-charcoal border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-bold text-sm"
                              placeholder="Activity / Milestone"
                            />
                         </div>
                         <div className="pt-2">
                           <button onClick={() => removeItem(idx)} className="p-2 text-gray-300 hover:text-redMain transition-colors opacity-0 group-hover:opacity-100">
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
                 Showcase Preview
               </h3>
               <div className="flex gap-4">
                  <PDFDownloadLink
                    document={<EventProgramPDF data={formData} />}
                    fileName={`Event_Program_${formData.eventTitle || 'Draft'}.pdf`}
                  >
                    {({ loading: pdfLoading }) => (
                      <Button 
                        label={pdfLoading ? 'Loading...' : 'Download PDF'} 
                        variant="primary"
                        icon={<FaDownload />}
                        className="py-2 text-xs"
                        disabled={pdfLoading}
                      />
                    )}
                  </PDFDownloadLink>
               </div>
            </div>
            
            <div className="rounded-[2.5rem] bg-slate-200 p-8 shadow-2xl border-4 border-white overflow-hidden min-h-[900px]">
               <div className="bg-white p-12 md:p-20 shadow-inner min-h-[850px] flex flex-col font-sans relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                     <FaCalendarAlt className="text-[15rem] text-charcoal rotate-[-15deg]" />
                  </div>

                  <div className="text-center mb-20">
                    <p className="text-[10px] font-black text-redMain uppercase tracking-[0.5em] mb-4">Official Sequence</p>
                    <h2 className="text-5xl font-black text-charcoal uppercase tracking-tighter leading-none mb-6">
                      {formData.eventTitle || 'Event Program'}
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                       <span>{formData.date}</span>
                       <div className="w-1 h-1 rounded-full bg-redMain" />
                       <span>{formData.venue}</span>
                    </div>
                  </div>

                  <div className="flex-1 max-w-2xl mx-auto w-full space-y-12">
                     {formData.items.map((item, idx) => (
                       <div key={idx} className="flex gap-12 group animate-fade-in relative pl-8">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100 group-hover:bg-redMain transition-colors duration-500 rounded-full" />
                          <div className="absolute left-[-5px] top-4 w-3 h-3 bg-white border-2 border-slate-200 group-hover:border-redMain transition-all duration-500 rounded-full" />
                          
                          <div className="w-24 shrink-0">
                             <p className="text-lg font-black text-redMain tracking-tighter">{item.time || '--:--'}</p>
                          </div>
                          <div className="flex-1">
                             <p className="text-xl font-black text-charcoal uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                                {item.activity || 'Activity details...'}
                             </p>
                             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Confirmed Milestone</p>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="mt-20 pt-12 border-t-2 border-slate-50 text-center">
                    <p className="text-[10px] font-black text-slate-200 uppercase tracking-[0.6em]">
                      Precision Orchestration • Twende Documents Architects
                    </p>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EventProgram;
