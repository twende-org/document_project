import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import axios from "axios";
import Button from "../formElements/Button";

export const Verification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("We are verifying your account...");
  const token = searchParams.get("token");

  const backendUrl = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found in the URL.");
      return;
    }

    const verify = async () => {
      try {
        await axios.get(`${backendUrl}/auth/verify-email/?token=${token}`);
        setStatus("success");
        setMessage("Email Verified Successfully! Your account is now active.");
        
        // Auto redirect after 3 seconds
        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);
      } catch (error: any) {
        setStatus("error");
        const backendError = error.response?.data?.error || error.response?.data?.detail;
        setMessage(backendError || "Verification failed. The link might be expired or invalid.");
      }
    };

    verify();
  }, [token, backendUrl]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 font-sans">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 max-w-md w-full text-center border border-gray-100 dark:border-gray-700">
        {status === "verifying" && (
          <FaSpinner className="text-primary text-6xl mx-auto mb-6 animate-spin" />
        )}
        {status === "success" && (
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6 animate-bounce" />
        )}
        {status === "error" && (
          <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-6" />
        )}

        <h2 className={`text-2xl font-bold mb-4 ${status === "error" ? "text-red-600" : "text-gray-800 dark:text-white"}`}>
          {status === "verifying" ? "Verifying Account" : status === "success" ? "Success!" : "Verification Issue"}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {message}
        </p>

        <Button
          type="button"
          label={status === "success" ? "Go to Sign In" : "Back to Home"}
          onClick={() => (window.location.href = "/signin")}
          className="w-full bg-primary hover:bg-redMain text-white py-3 rounded-xl transition-all font-bold shadow-lg shadow-primary/20"
        />
      </div>
    </div>
  );
};
