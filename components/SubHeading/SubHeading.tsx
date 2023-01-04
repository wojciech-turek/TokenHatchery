import React from "react";

const SubHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h4 className="mt-12 mb-4 text-3xl leading-6 font-bold text-gray-900 text-center lg:text-left">
      {children}
    </h4>
  );
};

export default SubHeading;
