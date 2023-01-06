import Image from "next/image";
import React from "react";

const SecuredBy = () => {
  return (
    <div className="bg-indigo-200 bg-opacity-25">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap lg:gap-12 gap-4 items-center justify-center">
          <h2 className="max-w-md text-3xl font-bold tracking-tight text-center text-indigo-900 lg:max-w-3xl lg:text-left">
            Protected by leading security experts from
          </h2>
          <div className="mt-8 flow-root self-center lg:mt-0">
            <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
              <div className="mt-4 ml-8 flex flex-shrink-0 flex-grow justify-center lg:ml-4 lg:flex-grow-0">
                <Image
                  className=""
                  src={"/openzeppelin.png"}
                  alt="OpenZeppelin logo"
                  width={250}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuredBy;
