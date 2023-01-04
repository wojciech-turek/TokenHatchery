import Image from "next/image";
import React from "react";

const navigation = [
  {
    name: "GitHub",
    href: "https://github.com/wojciech-turek/TokenHatchery",
    icon: "/github.png",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <Image
                className=""
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
              />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-gray-400">
            &copy; 2023 TokenHatchery, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
