import React from "react";

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      className="cursor-pointer font-bold text-indigo-500 hover:brightness-50"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
