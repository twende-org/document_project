import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TfiClose } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { closeSignInModal } from "../../store/uiSlice";
import { type RootState } from "../../store/store";
import { SignInPageContent } from "./SignInPageContent";

export const SignInModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isSignInModalOpen);

  const handleClose = () => {
    dispatch(closeSignInModal());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-secondary/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-[450px] md:max-w-5xl bg-white rounded-3xl md:rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Side: Premium Brand Panel (Desktop Only) */}
            <div className="hidden md:flex md:w-[35%] bg-secondary relative overflow-hidden flex-col justify-between p-12">
               <div className="relative z-10">
                  <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-2 italic">
                    TWENDE<span className="text-primary">DOCS</span>
                  </h2>
                  <div className="w-10 h-1 bg-primary mb-6" />
                  <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px] leading-relaxed">
                    ENTERPRISE<br />SOLUTIONS<br />v2.4
                  </p>
               </div>
               
               <div className="relative z-10">
                  <p className="text-white font-bold text-xl tracking-tight mb-2 leading-tight">
                    Professional <span className="text-primary italic">Document Architecture.</span>
                  </p>
                  <p className="text-white/40 text-xs font-medium">Built for agents and individuals who demand excellence.</p>
               </div>

               {/* Background Asset */}
               <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                  <img src="/assets/auth_bg.png" alt="Auth Background" className="w-full h-full object-cover scale-110" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-secondary/40" />
            </div>

            {/* Right Side: Form Panel */}
            <div className="flex-1 relative bg-white flex flex-col">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 md:top-8 md:right-8 p-2.5 text-secondary/30 hover:text-primary hover:bg-primary/5 rounded-xl transition-all active:scale-95 z-[60]"
                >
                  <TfiClose size={18} strokeWidth={2} />
                </button>

                <div className="p-6 sm:p-10 md:p-16 flex-1 overflow-y-auto max-h-[85vh] md:max-h-none">
                  <SignInPageContent onNavigate={handleClose} />
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
