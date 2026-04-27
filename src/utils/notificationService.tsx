import { toast, type ToastOptions } from 'react-toastify';
import React from 'react';

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored", // Using colored theme for premium feel
};

export const notify = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  },
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options });
  },
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options });
  },
  warn: (message: string, options?: ToastOptions) => {
    toast.warn(message, { ...defaultOptions, ...options });
  },
  // High-end "Assembly Line" notification for the factory
  factory: (message: string) => {
    toast.info(message, {
      ...defaultOptions,
      icon: <span>🏗️</span>,
      style: { backgroundColor: "#2D3436" }
    });
  }
};

