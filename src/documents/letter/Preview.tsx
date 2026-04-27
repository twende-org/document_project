import React from "react";
import { FaEnvelopeOpenText, FaMapMarkerAlt, FaCalendarAlt, FaUserTie } from "react-icons/fa";

interface LetterPreviewProps {
  data: any;
}

const Preview: React.FC<LetterPreviewProps> = ({ data }) => {
  const { 
    sender_name, senderAddress, senderPhone,
    recipient_name, recipientTitle, recipientCompany, recipient_address,
    date = new Date().toLocaleDateString(),
    subject,
    salutation = "Dear Sir/Madam,",
    body,
    closing = "Yours Sincerely,"
  } = data;

  return (
    <div className="bg-slate-200 p-4 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden min-h-[800px] sticky top-32">
      <div className="bg-white p-12 md:p-16 shadow-inner min-h-[700px] flex flex-col font-serif text-charcoal leading-relaxed">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-16 pb-8 border-b border-slate-100">
           <div>
              <div className="flex items-center gap-3 mb-2">
                <FaEnvelopeOpenText className="text-redMain text-2xl" />
                <h2 className="text-2xl font-black tracking-tighter uppercase text-charcoal font-sans">Official</h2>
              </div>
              <p className="text-redMain font-black tracking-[0.3em] uppercase text-[8px] font-sans">Correspondence Architecture</p>
           </div>
           <div className="text-right font-sans">
              <p className="font-black text-charcoal text-sm uppercase">{sender_name || "SENDER NAME"}</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-tight">{senderAddress || "OFFICE ADDRESS"}</p>
              <p className="text-[9px] text-redMain font-black uppercase tracking-widest">{senderPhone || "CONTACT INFO"}</p>
           </div>
        </div>

        {/* Date & Recipient */}
        <div className="mb-12 font-sans">
           <p className="text-xs font-black text-charcoal mb-8 border-l-4 border-slate-100 pl-4">{date}</p>
           
           <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">To:</p>
              <p className="font-black text-charcoal text-lg uppercase tracking-tight">{recipient_name || "RECIPIENT NAME"}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{recipientTitle || "TITLE"}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{recipientCompany || "ORGANIZATION"}</p>
              <p className="text-xs font-medium text-gray-500 max-w-xs">{recipient_address || "RECIPIENT ADDRESS"}</p>
           </div>
        </div>

        {/* Subject */}
        <div className="mb-10 font-sans">
           <h3 className="text-lg font-black text-redMain uppercase tracking-tight border-b-2 border-redMain/10 pb-2">
             RE: {subject || "OFFICIAL DOCUMENT SUBJECT LINE"}
           </h3>
        </div>

        {/* Body */}
        <div className="flex-1 text-sm text-gray-700 space-y-6">
           <p className="font-black text-charcoal">{salutation}</p>
           <div className="whitespace-pre-wrap leading-loose">
             {body || "Select this area to begin architecting your professional message. Our engine ensures legacy-grade formatting and corporate structural integrity."}
           </div>
        </div>

        {/* Closing */}
        <div className="mt-16 pt-12 border-t border-slate-50 font-sans">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{closing}</p>
           <div className="mt-12">
              <div className="w-48 h-px bg-slate-200 mb-4" />
              <p className="text-xl font-black text-charcoal uppercase tracking-tighter">{sender_name || "SENDER NAME"}</p>
              <p className="text-[10px] font-black text-redMain uppercase tracking-[0.4em] mt-1">Authorized Signatory</p>
           </div>
        </div>

        <div className="mt-12 text-center opacity-20">
           <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.4em] font-sans">Generated via Twende Documents Precision Engine</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
