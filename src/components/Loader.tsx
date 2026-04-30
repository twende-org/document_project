// src/components/Loader.tsx
import React from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  message = "Initializing...", 
  size = "lg",
  color = "#B91C1C" 
}) => {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4"
  };

  return (
    <div className={`${size === "lg" ? "fixed inset-0 bg-white/80 backdrop-blur-md z-[99999]" : "relative"} flex flex-col items-center justify-center`}>
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`${sizes[size]} rounded-full border-t-transparent border-r-transparent`}
          style={{ borderColor: color }}
        />
        {/* Inner Pulse */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-1/3 h-1/3 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      {size === "lg" && message && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-xs font-black uppercase tracking-[0.3em] text-secondary/60"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
