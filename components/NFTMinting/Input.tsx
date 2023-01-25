import React from "react";
import { InputProps } from "../../pages/mint";

export const Input = ({ value, onChange, type, name, label }: InputProps) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            name={name}
            id={name}
            rows={3}
            className="block w-full bg-gray-50 border-0 border-b border-transparent focus:border-indigo-600 focus:ring-0 sm:text-xl"
          />
        );
      case "boolean":
        return (
          <select
            name={name}
            id={name}
            className="block w-full bg-gray-50 border-0 border-b border-transparent focus:border-indigo-600 focus:ring-0 sm:text-xl"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="block w-full bg-gray-50 border-0 border-b border-transparent focus:border-indigo-600 focus:ring-0 sm:text-xl"
          />
        );
    }
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
        {renderInput()}
      </div>
    </div>
  );
};
