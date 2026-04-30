import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMagic, FaDownload, FaRocket, FaFileAlt, FaPenNib, FaCloudDownloadAlt, FaPalette, FaThLarge, FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";

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
  onImportProfile?: () => void;
  settings?: any;
  onSettingsChange?: (settings: any) => void;
  templates?: any[]; // Array of { id, label, desc }
}

const PRESET_COLORS = [
  "#B91C1C", "#1E293B", "#0F766E", "#7C3AED", "#2563EB", "#D97706", "#059669", "#4B5563"
];

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
  onStartTemplate,
  onImportProfile,
  settings,
  onSettingsChange,
  templates = [
    { id: 'standard', label: 'Standard Professional', desc: 'Classic industry-ready layout.' },
    { id: 'modern', label: 'Modern Minimal', desc: 'Clean with generous whitespace.' },
    { id: 'compact', label: 'Efficient Compact', desc: 'Optimized for density.' }
  ]
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"templates" | "content" | "design">("templates");

  const updateThemeColor = (color: string) => {
    if (onSettingsChange && settings) {
      onSettingsChange({
        ...settings,
        theme: { ...settings.theme, primaryColor: color }
      });
    }
  };

  const updateLayout = (layout: string) => {
    if (onSettingsChange && settings) {
      onSettingsChange({
        ...settings,
        layout
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light overflow-x-hidden text-left">
      {/* 1. Header & Smart Start */}
      <section className="bg-secondary py-12 text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div>
              <h2 className="label-premium text-primary text-[10px] md:text-action">{subtitle}</h2>
              <h1 className="text-3xl md:text-display text-white">{title}</h1>
           </div>
           
           <div className="grid grid-cols-2 lg:flex gap-4 md:gap-6 w-full md:w-auto">
              <button 
                onClick={onStartTemplate} 
                className="group flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all text-center"
              >
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[9px] md:text-[10px]">
                   <FaFileAlt className="text-primary group-hover:scale-110 transition-transform" /> 
                   <span className="truncate">Standard Start</span>
                </div>
                <span className="text-[7px] md:text-[8px] text-white/40 font-medium uppercase tracking-tighter">Fast Track</span>
              </button>
 
              <button 
                onClick={onStartAI} 
                className="group flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl bg-primary text-white hover:bg-redMain transition-all shadow-xl shadow-red-900/20 active:scale-95 text-center"
              >
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[9px] md:text-[10px]">
                  <FaMagic className="group-hover:rotate-12 transition-transform" /> 
                  <span className="truncate">Magic Start</span>
                </div>
                <span className="text-[7px] md:text-[8px] text-white/70 font-medium uppercase tracking-tighter">AI Generation</span>
              </button>
 
              {onImportProfile && (
                <button 
                  onClick={onImportProfile} 
                  className="group flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl border border-primary/20 hover:bg-primary/5 transition-all text-center"
                >
                  <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[9px] md:text-[10px] text-primary">
                    <FaCloudDownloadAlt className="group-hover:translate-y-1 transition-transform" /> 
                    <span className="truncate">Import Data</span>
                  </div>
                  <span className="text-[7px] md:text-[8px] text-primary/60 font-medium uppercase tracking-tighter">Sync Profile</span>
                </button>
              )}
 
              <button 
                onClick={onStartBlank} 
                className="group flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all text-center"
              >
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[9px] md:text-[10px]">
                  <FaPenNib className="group-hover:-translate-y-1 transition-transform" /> 
                  <span className="truncate">Manual Entry</span>
                </div>
                <span className="text-[7px] md:text-[8px] text-white/40 font-medium uppercase tracking-tighter">Full Control</span>
              </button>
           </div>
        </div>
      </section>

      {/* 2. Main Editor Area */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Form Controls & Design */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Mode Switcher */}
            <div className="flex flex-wrap sm:flex-nowrap bg-white p-1 rounded-2xl border border-neutral-border shadow-sm w-full sm:w-fit mb-8 overflow-hidden">
              <button 
                onClick={() => setActiveTab("templates")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "templates" ? "bg-secondary text-white shadow-lg" : "text-secondary/40 hover:text-secondary"}`}
              >
                <FaThLarge size={14} /> Templates
              </button>
              <button 
                onClick={() => setActiveTab("content")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "content" ? "bg-secondary text-white shadow-lg" : "text-secondary/40 hover:text-secondary"}`}
              >
                <FaEdit size={14} /> Data
              </button>
              <button 
                onClick={() => setActiveTab("design")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "design" ? "bg-secondary text-white shadow-lg" : "text-secondary/40 hover:text-secondary"}`}
              >
                <FaPalette size={14} /> Design
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "templates" && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <section className="card-premium p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                        <FaThLarge size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em]">Select Template</h3>
                        <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest">Choose the layout that fits your needs</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {templates.map(layout => (
                        <button
                          key={layout.id}
                          onClick={() => updateLayout(layout.id)}
                          className={`flex flex-col items-start text-left p-6 rounded-2xl border-2 transition-all active:scale-[0.98] ${settings?.layout === layout.id ? "border-primary bg-primary/5" : "border-neutral-border hover:border-secondary/20"}`}
                        >
                          <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${settings?.layout === layout.id ? "text-primary" : "text-secondary"}`}>{layout.label}</span>
                          <span className="text-[8px] font-bold text-secondary/40 uppercase tracking-tighter">{layout.desc}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === "content" && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {children}
                </motion.div>
              )}

              {activeTab === "design" && (
                <motion.div
                  key="design"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Theme Section */}
                  <section className="card-premium p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <FaPalette size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em]">Theme Colors</h3>
                        <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest">Personalize your brand identity</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Primary Signature Color</label>
                      <div className="flex flex-wrap gap-3">
                        {PRESET_COLORS.map(color => (
                          <button
                            key={color}
                            onClick={() => updateThemeColor(color)}
                            className={`w-12 h-12 rounded-2xl transition-all active:scale-90 shadow-sm ${settings?.theme?.primaryColor === color ? "ring-4 ring-offset-4 ring-primary scale-110" : "hover:scale-105"}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        <div className="relative">
                           <input 
                            type="color" 
                            value={settings?.theme?.primaryColor || "#B91C1C"}
                            onChange={(e) => updateThemeColor(e.target.value)}
                            className="w-12 h-12 rounded-2xl cursor-pointer bg-white border-2 border-neutral-border p-1"
                           />
                        </div>
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sticky Action Footer for Mobile/Quick Access */}
            <div className="bg-white p-6 md:p-8 rounded-card shadow-premium border border-neutral-border flex gap-4">
               <button 
                  onClick={onSave}
                  disabled={isSaving}
                  className="btn-primary flex-1 py-4 md:py-6 text-base md:text-lg flex items-center justify-center gap-3"
               >
                  {isSaving ? <span className="animate-spin text-xl">⏳</span> : <FaRocket />}
                  {isSaving ? "Architecting..." : "Finalize & Download"}
               </button>
            </div>
          </motion.div>

          {/* Right Side: Virtual Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 sticky top-24 w-full overflow-hidden"
          >
            <div className="bg-white rounded-card shadow-premium border border-neutral-border p-2 min-h-[700px] flex flex-col w-full">
               <div className="bg-neutral-light p-4 flex justify-between items-center border-b border-neutral-border">
                  <span className="text-action text-secondary/40">Real-time Preview</span>
                  {isPolishing && <span className="text-primary text-[10px] animate-pulse font-black uppercase">AI Polishing...</span>}
               </div>
               <div className="flex-1 bg-neutral-light/50 p-4 md:p-8 flex justify-center overflow-x-auto w-full">
                  <div className="min-w-[700px] w-full">
                     {preview}
                  </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

