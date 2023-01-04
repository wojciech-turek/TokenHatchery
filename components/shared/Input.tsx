import React from "react";

const Input = ({
  type,
  name,
  placeholder,
}: {
  type: string;
  name: string;
  placeholder?: string;
}) => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        {capitalizedName}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
