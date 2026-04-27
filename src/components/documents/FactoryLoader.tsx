import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineSetting } from 'react-icons/ai';

interface FactoryLoaderProps {
  isLoading: boolean;
  message?: string;
}

const FactoryLoader: React.FC<FactoryLoaderProps> = ({ isLoading, message = "Assembling your document..." }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated Gears for Factory Feel */}
            <div className="flex gap-2 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-redMain"
              >
                <AiOutlineSetting size={48} />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-subHeadingGray/40 mt-4"
              >
                <AiOutlineSetting size={32} />
              </motion.div>
            </div>

            {/* Progress Bar Animation */}
            <div className="w-64 h-1.5 bg-subHeadingGray/10 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-redMain shadow-[0_0_10px_rgba(255,59,48,0.5)]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-text font-medium tracking-wide text-lg"
            >
              {message}
            </motion.p>
            <p className="text-subHeadingGray text-xs mt-2 uppercase tracking-tighter">Twende Digital Factory</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FactoryLoader;
