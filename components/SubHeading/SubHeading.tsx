import React from "react";

const SubHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h4
      className={`mt-12 mb-4 text-3xl leading-6 font-bold text-gray-900 text-center lg:text-left ${className}`}
    >
      {children}
    </h4>
  );
};

export default SubHeading;
