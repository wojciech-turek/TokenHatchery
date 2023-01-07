import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const Input = ({
  type,
  name,
  placeholder,
  error,
  errorMessage,
  onChange,
  value,
}: {
  type: string;
  name: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-gray-700">
        {capitalizedName}
      </label>
      <div className="relative mt-1">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          onChange={onChange}
        />
        {error ? (
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          </div>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-red-600">{error ? errorMessage : ""}</p>
    </div>
  );
};

export default Input;
