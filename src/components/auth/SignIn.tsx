import React from "react";
import { SignInPageContent } from "./SignInPageContent";

export const SignInPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-background text-text px-4 py-20">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-redMain to-primary" />
        <SignInPageContent />
      </div>
    </div>
  );
};
