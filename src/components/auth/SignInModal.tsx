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
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden border border-white/10"
          >
            {/* Design Elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-redMain via-primary to-orange-500" />
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-3 text-gray-400 hover:text-white bg-gray-100 dark:bg-gray-800 rounded-2xl transition-all active:scale-95 z-10"
            >
              <TfiClose size={20} />
            </button>

            {/* Content Overflow for padding */}
            <div className="p-10 pt-16">
              <SignInPageContent onNavigate={handleClose} />
            </div>

            {/* Footer Branding */}
            <div className="bg-gray-50/50 dark:bg-white/5 py-4 px-10 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Twende Precision Architecture &copy; 2026
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
