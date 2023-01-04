import Link from "next/link";
import React from "react";

const ErroPage = () => {
  return (
    <div className="flex min-h-full items-center justify-center flex-col bg-white mt-6 pt-16 pb-12">
      <div className="flex flex-shrink-0 justify-center">
        <span className="sr-only">Your Company</span>
      </div>
      <div className="py-16">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found.
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="text-base font-medium text-indigo-600 hover:text-indigo-500"
            >
              Go back home
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErroPage;
