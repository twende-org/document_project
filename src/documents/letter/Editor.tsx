import React, { useState } from "react";
import { FaEnvelopeOpenText, FaUserTie, FaPenNib, FaMagic } from "react-icons/fa";
import { useDocumentEngine } from "../hooks/useDocumentEngine";
import { SmartEditorLayout } from "../../components/editor/SmartEditorLayout";
import Preview from "./Preview";
import type { LetterContent } from "../types";
import { LETTER_TEMPLATE } from "../templates";
import { toast } from "react-toastify";

const Editor = () => {
  const initialData: LetterContent = {
    sender_name: "",
    recipient_name: "",
    recipient_address: "",
    date: new Date().toISOString().split("T")[0],
    subject: "",
    body: "",
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
  } = useDocumentEngine<LetterContent>(initialData, 'LETTER');

  const [docTitle, setDocTitle] = useState("Official Letter");

  const onSave = async () => {
    try {
      await handleSave(docTitle, 'FINAL');
      alert("Letter Finalized & Securely Saved.");
    } catch (err) {}
  };

  const polishBody = async () => {
    if (!formData.body) return;
    const polished = await handlePolish(formData.body);
    updateField('body', polished);
  };

  return (
    <SmartEditorLayout
      title="Letter Architect"
      subtitle="Correspondence Engine"
      onSave={onSave}
      isSaving={isSaving}
      isPolishing={isPolishing}
      isValidated={isValidated}
      preview={<Preview data={formData} />}
      onStartBlank={() => {
        setFormData(initialData);
        toast.info("Started with a crisp blank page.");
      }}
      onStartTemplate={() => {
        setFormData(LETTER_TEMPLATE);
        toast.success("Professional corporate letter template loaded!");
      }}
      onStartAI={() => {
        setFormData({
          ...LETTER_TEMPLATE,
          subject: "AI-Enhanced Subject Architecture",
          body: "This letter content was initialized using Twende AI. It follows a professional hierarchy designed to communicate authority and precision..."
        });
        toast.success("AI-drafted correspondence initialized!");
      }}
    >
      <div className="space-y-12">
        {/* Sender Details */}
        <div className="card-premium">
          <h3 className="text-heading text-xl mb-8 flex items-center gap-3">
            <FaPenNib className="text-primary" /> 01. Sender Identity
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="label-premium">Full Name / Organization</label>
              <input 
                 type="text" 
                 value={formData.sender_name}
                 onChange={(e) => updateField('sender_name', e.target.value)}
                 className="input-premium p-4"
                 placeholder="e.g. Director, Acme Int'l"
              />
            </div>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="card-premium">
          <h3 className="text-heading text-xl mb-8 flex items-center gap-3">
            <FaUserTie className="text-primary" /> 02. Recipient Architecture
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="label-premium">Recipient Name</label>
              <input 
                type="text" 
                value={formData.recipient_name}
                onChange={(e) => updateField('recipient_name', e.target.value)}
                className="input-premium p-4"
              />
            </div>
            <div>
              <label className="label-premium">Issue Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => updateField('date', e.target.value)}
                className="input-premium p-4"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label-premium">Recipient Address</label>
              <input 
                type="text" 
                value={formData.recipient_address}
                onChange={(e) => updateField('recipient_address', e.target.value)}
                className="input-premium p-4"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card-premium">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-heading text-xl flex items-center gap-3">
               <FaEnvelopeOpenText className="text-primary" /> 03. Message Content
            </h3>
            <button 
              onClick={polishBody}
              disabled={isPolishing || !formData.body}
              className="text-primary text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <FaMagic /> AI Polish Body
            </button>
          </div>
          <div className="space-y-8">
            <div>
              <label className="label-premium">Official Subject Line</label>
              <input 
                type="text" 
                value={formData.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                className="input-premium p-4"
                placeholder="RE: Application for..."
              />
            </div>
            <div>
              <label className="label-premium">Message Body</label>
              <textarea 
                value={formData.body}
                onChange={(e) => updateField('body', e.target.value)}
                className="input-premium p-6 h-80 resize-none leading-relaxed"
                placeholder="Architect your message content here..."
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-primary/5 text-primary p-6 rounded-button border border-primary/10 text-center font-bold text-sm tracking-widest">
            {error}
          </div>
        )}
      </div>
    </SmartEditorLayout>
  );
};

export default Editor;
