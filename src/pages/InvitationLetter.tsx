import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaEnvelopeOpenText, FaEye, FaDownload, FaMapMarkerAlt, FaCalendarCheck, FaSave, FaChevronLeft } from 'react-icons/fa';
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { RootState, AppDispatch } from '../store/store';
import { saveDocument, aiPolishDocument } from '../features/documents/documentsSlice';
import LetterPDF from "../components/templates/document-templates/LetterPDF";
import Button from '../components/formElements/Button';

const InvitationLetter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((state: RootState) => state.documents);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    eventTitle: 'Grand Opening Ceremony',
    hostName: 'SmartDocs Team',
    guestName: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    venue: 'City Mall, 3rd Floor',
    message: 'We cordially invite you to join us for our grand opening ceremony...',
  });

  React.useEffect(() => {
    if (current && current.doc_type === 'INVITATION') {
      setFormData(current.content);
    }
  }, [current]);

  const letterContent = `
Dear ${formData.guestName || 'Honorable Guest'},

${formData.message}

Event Details:
Title: ${formData.eventTitle}
Date: ${formData.date}
Time: ${formData.time}
Venue: ${formData.venue}

We look forward to your presence.

Sincerely,
${formData.hostName}
  `;

  const handleSave = () => {
    dispatch(saveDocument({
      id: current?.id,
      doc_type: 'INVITATION',
      title: `Invitation: ${formData.eventTitle}`,
      content: formData
    })).unwrap()
    .then(() => alert("Invitation saved successfully!"))
    .catch((err) => alert(err || "Failed to save invitation."));
  };

  const handlePolish = () => {
    if (!current?.id) {
       alert("Please save the invitation first to polish with AI!");
       return;
    }
    dispatch(aiPolishDocument(current.id)).unwrap()
    .then(() => alert("AI has polished your invitation message!"))
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
               Invitation <span className="text-redMain">Architect</span>
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
                   <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">Event Basics</h3>
                   <div className="grid grid-cols-1 gap-6">
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Event Subject / Title</label>
                       <input 
                         type="text"
                         value={formData.eventTitle}
                         onChange={(e) => setFormData({...formData, eventTitle: e.target.value})}
                         className="input-premium"
                         placeholder="e.g. Wedding, Launch, Gala"
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Host Name</label>
                          <input 
                            type="text"
                            value={formData.hostName}
                            onChange={(e) => setFormData({...formData, hostName: e.target.value})}
                            className="input-premium"
                            placeholder="Organizer"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Guest Name</label>
                          <input 
                            type="text"
                            value={formData.guestName}
                            onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                            className="input-premium"
                            placeholder="Recipient"
                          />
                        </div>
                     </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Date</label>
                      <input 
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Time</label>
                      <input 
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="input-premium"
                      />
                    </div>
                 </div>

                 <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Venue Address</label>
                   <input 
                     type="text"
                     value={formData.venue}
                     onChange={(e) => setFormData({...formData, venue: e.target.value})}
                     className="input-premium"
                     placeholder="Full Location"
                   />
                 </div>

                 <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Personal Invitation Message</label>
                   <textarea 
                     rows={6}
                     value={formData.message}
                     onChange={(e) => setFormData({...formData, message: e.target.value})}
                     className="w-full p-6 bg-slate-50 dark:bg-charcoal border-2 border-transparent rounded-2xl shadow-inner focus:border-redMain outline-none transition-all font-bold text-sm"
                     placeholder="Type your warmth here..."
                   />
                 </div>
               </div>
            </section>
          </main>

          {/* Preview Side */}
          <aside className={`lg:col-span-7 sticky top-32 transition-all duration-500 ${showPreview ? "block" : "hidden lg:block"}`}>
            <div className="flex items-center justify-between mb-6 px-4">
               <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-redMain animate-ping" />
                 Elegance Preview
               </h3>
               <div className="flex gap-4">
                  <PDFDownloadLink
                    document={<LetterPDF data={{ 
                      applicantName: formData.hostName, 
                      date: formData.date, 
                      recipientName: formData.guestName, 
                      subject: `Invitation: ${formData.eventTitle}`,
                      letterContent: letterContent
                    }} />}
                    fileName={`Invitation_${formData.eventTitle || 'Letter'}.pdf`}
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
               <div className="bg-white p-12 md:p-20 shadow-inner min-h-[850px] flex flex-col font-serif relative overflow-hidden items-center justify-center text-center">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                     <FaEnvelopeOpenText className="text-[15rem] text-charcoal rotate-[15deg]" />
                  </div>

                  <div className="border-8 border-redMain p-2 rounded-2xl w-full max-w-2xl transform hover:scale-[1.01] transition-transform duration-700">
                     <div className="border-2 border-red-50 p-12 md:p-20 rounded-lg flex flex-col items-center">
                        <p className="text-[10px] font-black tracking-[0.8em] text-redMain uppercase mb-12">The Invitation</p>
                        
                        <h2 className="text-5xl font-black text-charcoal uppercase tracking-tighter leading-none mb-12">
                           {formData.eventTitle || 'Grand Event'}
                        </h2>

                        <div className="w-20 h-1 bg-redMain mb-12" />

                        <div className="space-y-8 text-xl text-charcoal italic leading-relaxed">
                           <p>Dear {formData.guestName || 'Honorable Guest'},</p>
                           <p className="max-w-md mx-auto">{formData.message || 'We cordially invite you to be part of our special celebration...'}</p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-md">
                           <div className="flex flex-col items-center gap-4">
                              <div className="p-4 bg-slate-50 rounded-full text-redMain border-2 border-red-50">
                                 <FaCalendarCheck className="text-2xl" />
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date & Time</p>
                                 <p className="text-sm font-black text-charcoal uppercase">{formData.date} • {formData.time}</p>
                              </div>
                           </div>
                           <div className="flex flex-col items-center gap-4">
                              <div className="p-4 bg-slate-50 rounded-full text-redMain border-2 border-red-50">
                                 <FaMapMarkerAlt className="text-2xl" />
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Venue</p>
                                 <p className="text-sm font-black text-charcoal uppercase">{formData.venue || 'TBA'}</p>
                              </div>
                           </div>
                        </div>

                        <div className="mt-20">
                           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 font-sans">Compliments of</p>
                           <p className="text-2xl font-black text-redMain uppercase tracking-tighter leading-none">
                              {formData.hostName || 'THE HOST'}
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-12 text-[8px] font-black text-slate-200 uppercase tracking-[1em]">
                     Twende Documents Prestige
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default InvitationLetter;
