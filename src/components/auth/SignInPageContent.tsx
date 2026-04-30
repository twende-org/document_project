/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { loginUser, googleAuthUser, registerUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { FaCheckCircle, FaArrowRight, FaGoogle, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Loader";
import InputField from "../formElements/InputField";
import Button from "../formElements/Button";

interface SignInPageContentProps {
  onNavigate?: () => void;
  initialMode?: "signin" | "signup";
}

const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z.object({
  first_name: z.string().nonempty("First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().nonempty("Last name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().nonempty("Confirm Password is required"),
  role: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const SignInPageContent: React.FC<SignInPageContentProps> = ({ onNavigate, initialMode = "signin" }) => {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
    reset: resetSignUp,
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    if (!token) return;
    setLoading(true);
    try {
      const userPayload = await dispatch(googleAuthUser({ token })).unwrap();
      const redirectPath = userPayload.user?.role === "agent" || userPayload.user?.role === "admin" ? "/panel" : "/documents";
      toast.success("Welcome back!");
      if (onNavigate) onNavigate();
      else window.location.href = redirectPath; 
    } catch (err: any) {
      toast.error(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const onLoginSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
    setLoading(true); 
    setErrorMsg("");
    try {
      const userPayload = await dispatch(loginUser(data)).unwrap();
      const redirectPath = userPayload.user?.role === "agent" || userPayload.user?.role === "admin" ? "/panel" : "/documents";
      setShowSuccess(true);
      setTimeout(() => {
        if (onNavigate) onNavigate();
        else window.location.href = redirectPath;
      }, 1500);
    } catch (error: any) {
      setErrorMsg(error?.detail || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const onSignUpSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = async (data) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await dispatch(registerUser({ 
        first_name: data.first_name, 
        middle_name: data.middle_name, 
        last_name: data.last_name, 
        email: data.email, 
        password: data.password,
        confirm_password: data.confirmPassword,
        role: data.role === "agent" ? "agent" : "customer"
      })).unwrap();

      setShowSuccess(true);
      resetSignUp();
      
      if (!response.verification_required) {
        setTimeout(() => {
          if (onNavigate) onNavigate();
          else window.location.href = "/panel";
        }, 1500);
      } else {
        toast.info("Please verify your email address.");
      }
    } catch (err: any) {
      setErrorMsg(err?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 md:py-20 text-center"
          >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-2">
              {mode === "signin" ? "Welcome Back" : "Account Created"}
            </h2>
            <p className="text-secondary/60 text-sm max-w-[240px]">
              {mode === "signin" ? "Redirecting you to your dashboard..." : "Setting up your workspace..."}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            {/* Header */}
            <div className="mb-8 text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-secondary tracking-tight mb-2">
                {mode === "signin" ? "Sign In" : "Create Account"}
              </h1>
              <p className="text-secondary/50 text-sm">
                {mode === "signin" ? "Enter your credentials to access your account." : "Join thousands of professionals worldwide."}
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-50 border-l-2 border-redMain p-3 mb-6"
                >
                  <p className="text-redMain text-xs font-medium">{errorMsg}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Auth */}
            <div className="mb-6">
               <div className="relative group">
                  <div className="relative bg-white border border-gray-200 rounded-xl flex justify-center items-center hover:bg-gray-50 transition-all overflow-hidden">
                    <GoogleLogin 
                      onSuccess={handleGoogleSuccess} 
                      onError={() => toast.error("Google login failed")} 
                      theme="outline"
                      shape="rect"
                      width="100%"
                      size="large"
                      text={mode === "signin" ? "signin_with" : "signup_with"}
                    />
                  </div>
               </div>
               <div className="relative flex items-center justify-center my-6">
                  <div className="flex-grow border-t border-gray-100"></div>
                  <span className="flex-shrink mx-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider">or continue with email</span>
                  <div className="flex-grow border-t border-gray-100"></div>
               </div>
            </div>

            {/* Auth Forms */}
            <div className="text-left">
               {mode === "signin" ? (
                 <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
                    <div className="space-y-3">
                       <div>
                          <label className="text-xs font-semibold text-secondary/70 mb-1.5 block ml-0.5">Email Address</label>
                          <div className="relative group">
                             <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors text-sm" />
                             <input 
                                {...loginRegister("email")}
                                type="email"
                                placeholder="e.g. john@example.com"
                                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-secondary outline-none transition-all"
                             />
                          </div>
                          {loginErrors.email && <p className="text-[11px] text-redMain mt-1.5 ml-0.5 font-medium">{loginErrors.email.message}</p>}
                       </div>

                       <div>
                          <div className="flex justify-between items-center mb-1.5 px-0.5">
                             <label className="text-xs font-semibold text-secondary/70">Password</label>
                             <button type="button" className="text-xs font-semibold text-primary hover:underline transition-all">Forgot password?</button>
                          </div>
                          <div className="relative group">
                             <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors text-sm" />
                             <input 
                                {...loginRegister("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="Your password"
                                className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-xl py-3.5 pl-11 pr-12 text-sm font-medium text-secondary outline-none transition-all"
                             />
                             <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors p-1"
                             >
                                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                             </button>
                          </div>
                          {loginErrors.password && <p className="text-[11px] text-redMain mt-1.5 ml-0.5 font-medium">{loginErrors.password.message}</p>}
                       </div>
                    </div>

                    <button 
                       type="submit" 
                       disabled={loading}
                       className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold text-sm py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-2"
                    >
                       {loading ? <Loader size="sm" color="#FFFFFF" /> : (
                         <>
                           Sign In <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                         </>
                       )}
                    </button>
                 </form>
               ) : (
                 <form onSubmit={handleSignUpSubmit(onSignUpSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       <div className="relative group">
                          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors text-sm" />
                          <input 
                             {...signUpRegister("first_name")}
                             placeholder="First Name"
                             className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-secondary outline-none transition-all"
                          />
                       </div>
                       <div className="relative group">
                          <input 
                             {...signUpRegister("last_name")}
                             placeholder="Last Name"
                             className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-xl py-3 px-4 text-sm font-medium text-secondary outline-none transition-all"
                          />
                       </div>
                    </div>
                    
                    <div className="relative group">
                       <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors text-sm" />
                       <input 
                          {...signUpRegister("email")}
                          placeholder="Email Address"
                          className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-secondary outline-none transition-all"
                       />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       <div className="relative group">
                          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors text-sm" />
                          <input 
                             {...signUpRegister("password")}
                             type={showPassword ? "text" : "password"}
                             placeholder="Password"
                             className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-xl py-3 pl-11 pr-10 text-sm font-medium text-secondary outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors p-1"
                          >
                            {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                          </button>
                       </div>
                       <div className="relative group">
                          <input 
                             {...signUpRegister("confirmPassword")}
                             type={showPassword ? "text" : "password"}
                             placeholder="Confirm"
                             className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-xl py-3 px-4 text-sm font-medium text-secondary outline-none transition-all"
                          />
                       </div>
                    </div>

                    <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-xl border border-gray-100">
                      <input 
                        type="checkbox" 
                        id="isAgent"
                        {...signUpRegister("role")}
                        value="agent"
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer transition-all"
                      />
                      <label htmlFor="isAgent" className="text-xs font-semibold text-secondary/70 cursor-pointer select-none">
                        Register as an Agent / Stationery Shop
                      </label>
                    </div>

                    <button 
                       type="submit" 
                       disabled={loading}
                       className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-sm py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-2"
                    >
                       {loading ? <Loader size="sm" color="#FFFFFF" /> : (
                         <>
                           Create Account <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                         </>
                       )}
                    </button>
                 </form>
               )}
            </div>

            {/* Footer Toggle */}
            <div className="mt-8 pt-6 border-t border-gray-50 text-center">
               <button 
                  onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setErrorMsg(""); }}
                  className="text-sm font-medium text-secondary/50 hover:text-primary transition-colors"
               >
                  {mode === "signin" ? (
                    <>New here? <span className="text-primary font-bold ml-1">Create an account</span></>
                  ) : (
                    <>Already have an account? <span className="text-primary font-bold ml-1">Sign In</span></>
                  )}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
