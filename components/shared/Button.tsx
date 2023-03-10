import React from "react";
import { classNames } from "utils/client/classNames";

const Button = ({
  children,
  fullWidth,
  disabled,
  onClick,
  color,
  className,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  color?: string;
  className?: string;
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        fullWidth ? "w-full" : "",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        color
          ? `bg-${color}-600 hover:bg-${color}-700`
          : "bg-indigo-600 hover:bg-indigo-700",
        "inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
