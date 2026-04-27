/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { loginUser, googleAuthUser, registerUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import InputField from "../formElements/InputField";
import Button from "../formElements/Button";

interface SignInPageContentProps {
  onNavigate?: () => void;
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

export const SignInPageContent: React.FC<SignInPageContentProps> = ({ onNavigate }) => {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVerificationRequired, setIsVerificationRequired] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    try {
      const userPayload = await dispatch(googleAuthUser({ token })).unwrap();
      const redirectPath = userPayload.user?.role === "agent" || userPayload.user?.role === "admin" ? "/panel" : "/documents";
      toast.success("Authentication successful!");
      if (onNavigate) onNavigate();
      else window.location.href = redirectPath; 
    } catch (err: any) {
      toast.error(err.message || "Google auth failed.");
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
      }, 2000);
    } catch (error: any) {
      setErrorMsg(error?.detail || "Login failed");
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
      
      const { verification_required, message } = response;
      
      setIsVerificationRequired(!!verification_required);
      setShowSuccess(true);
      toast.success(message || "Account created! Please check your email.");

      // If auto-activated (dev mode), redirect
      if (!verification_required) {
        const redirectPath = response.user?.role === "agent" || response.user?.role === "admin" ? "/panel" : "/documents";
        setTimeout(() => {
          if (onNavigate) onNavigate();
          else window.location.href = redirectPath;
        }, 2000);
      }
    } catch (err: any) {
      setErrorMsg(err?.detail || err || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {showSuccess ? (
        <div className="flex flex-col items-center justify-center text-center py-8">
          <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce"/>
          <h2 className="text-2xl font-bold mb-2">Success!</h2>
          <p className="text-gray-500">
            {isVerificationRequired 
              ? "We've sent a verification link to your inbox. Please activate your account before signing in."
              : "Redirecting to your Twende Documents workspace..."}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-3xl font-black tracking-tight mb-2">
              {mode === "signin" ? <>Sign <span className="text-primary italic">In</span></> : <>Join <span className="text-primary italic">Twende</span></>}
            </h1>
            <p className="text-gray-400 text-sm">
                {mode === "signin" ? "Access your premium workspace documents." : "Create your account to save and manage documents."}
            </p>
          </div>

          {errorMsg && (
            <div className="text-redMain text-center mb-6 text-sm bg-red-50 dark:bg-red-900/10 py-3 px-4 rounded-2xl border border-red-200 dark:border-red-900/20">
              {errorMsg}
            </div>
          )}

          {mode === "signin" ? (
             <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4 relative">
             <InputField 
               placeholder="Enter your email" 
               name="email" 
               type="email" 
               register={loginRegister("email")} 
               error={loginErrors.email?.message}
             />
             <InputField 
               placeholder="Your secure password" 
               name="password" 
               type="password" 
               register={loginRegister("password")} 
               error={loginErrors.password?.message}
             />
             <Button 
                 type="submit" 
                 label={loading ? "Authenticating..." : "Sign In to Dashboard"} 
                 className="w-full h-14 bg-primary hover:bg-redMain text-white font-black uppercase tracking-widest transition-all shadow-xl shadow-red-900/20"
             />
             {loading && (
               <div className="absolute inset-0 flex justify-center items-center bg-white/10 backdrop-blur-sm rounded-2xl z-10">
                 <ClipLoader color="#B91C1C" size={40}/>
               </div>
             )}
           </form>
          ) : (
            <form onSubmit={handleSignUpSubmit(onSignUpSubmit)} className="space-y-4 relative">
                <div className="grid grid-cols-2 gap-4">
                    <InputField 
                        placeholder="First Name" 
                        name="first_name" 
                        type="text" 
                        register={signUpRegister("first_name")} 
                        error={signUpErrors.first_name?.message}
                    />
                    <InputField 
                        placeholder="Last Name" 
                        name="last_name" 
                        type="text" 
                        register={signUpRegister("last_name")} 
                        error={signUpErrors.last_name?.message}
                    />
                </div>
                <InputField 
                    placeholder="Middle Name" 
                    name="middle_name" 
                    type="text" 
                    register={signUpRegister("middle_name")} 
                    error={signUpErrors.middle_name?.message}
                />
                <InputField 
                    placeholder="Email Address" 
                    name="email" 
                    type="email" 
                    register={signUpRegister("email")} 
                    error={signUpErrors.email?.message}
                />
                <InputField 
                    placeholder="Create Password" 
                    name="password" 
                    type="password" 
                    register={signUpRegister("password")} 
                    error={signUpErrors.password?.message}
                />
                <InputField 
                    placeholder="Confirm Password" 
                    name="confirmPassword" 
                    type="password" 
                    register={signUpRegister("confirmPassword")} 
                    error={signUpErrors.confirmPassword?.message}
                />
                
                <div className="flex items-center gap-3 py-2 px-1">
                  <input 
                    type="checkbox" 
                    id="isAgentModal"
                    {...signUpRegister("role")}
                    value="agent"
                    className="w-4 h-4 rounded border-gray-300 text-redMain focus:ring-redMain cursor-pointer"
                  />
                  <label htmlFor="isAgentModal" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    Register as an Agent / Stationery Owner
                  </label>
                </div>

                <Button 
                    type="submit" 
                    label={loading ? "Creating Account..." : "Join Twende Documents"} 
                    className="w-full h-14 bg-primary hover:bg-redMain text-white font-black uppercase tracking-widest transition-all shadow-xl shadow-red-900/20"
                />
                {loading && (
                  <div className="absolute inset-0 flex justify-center items-center bg-white/10 backdrop-blur-sm rounded-2xl z-10">
                    <ClipLoader color="#B91C1C" size={40}/>
                  </div>
                )}
            </form>
          )}

          <div className="relative mt-10 mb-6 font-professional">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em] font-black text-gray-400">
              <span className="bg-white dark:bg-gray-900 px-4">Secure Authentication Gateway</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
             <GoogleLogin 
                onSuccess={handleGoogleSuccess} 
                onError={()=>toast.error("Google auth failed")}
                theme="filled_black"
                shape="pill"
                width="100%"
            />

            <button 
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-xs font-black uppercase tracking-widest text-primary hover:text-redMain transition-colors underline underline-offset-4 decoration-2"
            >
                {mode === "signin" ? "Don't have an account? Join Now" : "Already a member? Sign In"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
