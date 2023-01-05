import React from "react";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const Header = () => {
  const router = useRouter();
  const navigationItems = [
    {
      name: "Home",
      link: "/",
      active: router.pathname === "/",
    },
    {
      name: "Create",
      link: "/create",
      active: router.pathname === "/create",
    },
    {
      name: "Manage",
      link: "/manage",
      active: router.pathname === "/manage",
    },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link
                  href={"/"}
                  className="flex flex-shrink-0 items-center text-gray-700 font-bold text-xl tracking-tight"
                >
                  TokenHatchery
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    className={classNames(
                      item.active
                        ? "border-b-2 border-indigo-500"
                        : "border-transparent",
                      "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 "
                    )}
                    key={item.name}
                    href={item.link}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              {navigationItems.map((item) => (
                <Link
                  className={classNames(
                    item.active
                      ? "bg-gray-50 border-indigo-500 "
                      : "border-transparent hover:border-gray-300",
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-gray-500  hover:bg-gray-50 hover:text-gray-700"
                  )}
                  key={item.name}
                  href={item.link}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
