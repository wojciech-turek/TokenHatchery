import React from "react";

export function SectionHeader({ children }: { children: React.ReactNode; }) {
  return (
    <h3 className="my-6 text-xl font-bold leading-6 text-gray-900">
      {children}
    </h3>
  );
}
