import React from "react";

const PageHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-none lg:text-6xl">
          {children}
        </h2>
      </div>
    </div>
  );
};

export default PageHeading;
