import React from "react";
import { motion } from "framer-motion";
import { FaMagic, FaDownload, FaRocket, FaFileAlt, FaPenNib } from "react-icons/fa";

interface SmartEditorProps {
  title: string;
  subtitle: string;
  onSave: () => void;
  isSaving: boolean;
  isValidated: boolean;
  onAIAction?: () => void;
  isPolishing?: boolean;
  children: React.ReactNode; 
  preview: React.ReactNode; 
  onStartBlank?: () => void;
  onStartAI?: () => void;
  onStartTemplate?: () => void;
}

export const SmartEditorLayout: React.FC<SmartEditorProps> = ({
  title,
  subtitle,
  onSave,
  isSaving,
  isValidated,
  isPolishing,
  children,
  preview,
  onStartBlank,
  onStartAI,
  onStartTemplate
}) => {
  return (
    <div className="min-h-screen bg-neutral-light overflow-x-hidden">
      {/* 1. Header & Smart Start */}
      <section className="bg-secondary py-12 text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div>
              <h2 className="label-premium text-primary">{subtitle}</h2>
              <h1 className="text-display text-white">{title}</h1>
           </div>
           
           <div className="flex gap-6">
              <button 
                onClick={onStartTemplate} 
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">
                  <FaFileAlt className="text-primary group-hover:scale-110 transition-transform" /> 
                  Standard Template
                </div>
                <span className="text-[8px] text-white/40 font-medium uppercase tracking-tighter">Industry Redy Layout</span>
              </button>

              <button 
                onClick={onStartAI} 
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-primary text-white hover:bg-redMain transition-all shadow-xl shadow-red-900/20 active:scale-95"
              >
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">
                  <FaMagic className="group-hover:rotate-12 transition-transform" /> 
                  Start with AI
                </div>
                <span className="text-[8px] text-white/70 font-medium uppercase tracking-tighter">Magic Generation</span>
              </button>

              <button 
                onClick={onStartBlank} 
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">
                  <FaPenNib className="group-hover:-translate-y-1 transition-transform" /> 
                  Manual Blank
                </div>
                <span className="text-[8px] text-white/40 font-medium uppercase tracking-tighter">Total Control</span>
              </button>
           </div>
        </div>
      </section>

      {/* 2. Main Editor Area */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Form Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            {children}

            {/* Sticky Action Footer for Mobile/Quick Access */}
            <div className="bg-white p-8 rounded-card shadow-premium border border-neutral-border flex gap-4">
               <button 
                  onClick={onSave}
                  disabled={isSaving}
                  className="btn-primary flex-1 py-6 text-lg flex items-center justify-center gap-3"
               >
                  {isSaving ? <span className="animate-spin text-xl">⏳</span> : <FaRocket />}
                  {isSaving ? "Architecting..." : "Generate & Finalize"}
               </button>
            </div>
          </motion.div>

          {/* Right Side: Virtual Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 sticky top-24"
          >
            <div className="bg-white rounded-card shadow-premium border border-neutral-border p-2 min-h-[700px] overflow-hidden flex flex-col">
               <div className="bg-neutral-light p-4 flex justify-between items-center border-b border-neutral-border">
                  <span className="text-action text-secondary/40">Real-time Production Preview</span>
                  {isPolishing && <span className="text-primary text-[10px] animate-pulse font-black uppercase">AI Polishing in progress...</span>}
               </div>
               <div className="flex-1 bg-neutral-light/50 p-8 flex items-center justify-center">
                  {preview}
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
