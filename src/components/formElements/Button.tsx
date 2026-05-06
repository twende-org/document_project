import React from "react";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  icon,
  ...rest
}) => {
  const baseStyles = "flex items-center justify-center gap-3 font-black transition-all duration-300 rounded-[1.5rem] px-10 py-5 uppercase tracking-[0.2em] text-[10px] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-redMain text-white hover:bg-redMain/90 shadow-2xl shadow-redMain/30 hover:scale-105",
    secondary: "bg-charcoal text-white hover:bg-charcoal/90 shadow-2xl shadow-charcoal/30 hover:scale-105",
    outline: "border-2 border-redMain text-redMain hover:bg-redMain hover:text-white shadow-xl shadow-redMain/10 hover:scale-105"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      aria-disabled={disabled}
      {...rest}
    >
      {icon && <span className="text-base">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
