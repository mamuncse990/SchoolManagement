import React from "react";
import classNames from "classnames";
import { ChevronLeft } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline";
  size?: "sm" | "icon";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "default",
  size = "sm",
  disabled = false,
  className,
}) => {
  const baseStyles = "rounded-md font-semibold focus:outline-none";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };
  const sizeStyles = {
    sm: "text-sm",
    icon: "h-8 w-8 flex items-center justify-center",
  };

  const classes = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    { "opacity-50 cursor-not-allowed": disabled },
    className
  );

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;