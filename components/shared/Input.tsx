import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { classNames } from "utils/client/classNames";

const Input = ({
  type,
  name,
  placeholder,
  error,
  errorMessage,
  disabled,
  subtext,
  onChange,
  value,
}: {
  type: string;
  name: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  subtext?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}) => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className={classNames(disabled ? "opacity-50" : "")}>
      <label htmlFor={name} className="block text-sm font-bold text-gray-700">
        {capitalizedName}
      </label>
      <div className="relative mt-1">
        <input
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          value={value}
          className={classNames(
            disabled ? "bg-gray-50 cursor-not-allowed" : "",
            error ? "border-red-500" : "",
            "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-400"
          )}
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
      {subtext ? (
        <p className="mt-2 text-sm text-gray-500" id="mintPrice">
          {subtext}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
