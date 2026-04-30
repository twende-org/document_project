import React from "react";
import { SignInPageContent } from "./SignInPageContent";
import { motion } from "framer-motion";

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center py-20 px-4 relative overflow-hidden mesh-gradient">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -ml-64 -mt-64 animate-float" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -mr-48 -mb-48 animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row-reverse border border-secondary/5"
      >
        {/* Left Side: Brand Panel (Reversed for SignUp for variety) */}
        <div className="hidden md:flex md:w-5/12 bg-secondary relative overflow-hidden flex-col justify-between p-16">
           <div className="relative z-10 text-right">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-6 italic">
                TWENDE<span className="text-primary">DOCS</span>
              </h2>
              <div className="w-16 h-1.5 bg-primary mb-12 rounded-full ml-auto" />
              <p className="text-white/40 font-bold uppercase tracking-[0.4em] text-xs leading-relaxed">
                START YOUR<br />JOURNEY<br />v1.0
              </p>
           </div>
           
           <div className="relative z-10 text-right">
              <p className="text-white font-black text-2xl tracking-tighter uppercase mb-6 leading-tight">
                Architecting <span className="text-primary">Global Standards.</span>
              </p>
              <div className="flex gap-2 justify-end">
                 <div className="w-2 h-2 rounded-full bg-white/20" />
                 <div className="w-2 h-2 rounded-full bg-primary" />
                 <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
           </div>

           {/* Background Asset */}
           <div className="absolute inset-0 opacity-40 mix-blend-overlay scale-110 hover:scale-100 transition-transform duration-1000">
              <img src="/assets/auth_bg.png" alt="Auth Background" className="w-full h-full object-cover" />
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary/30" />
        </div>

        {/* Right Side: Form Panel */}
        <div className="flex-1 p-8 md:p-20 relative bg-white">
            <SignInPageContent initialMode="signup" />
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
