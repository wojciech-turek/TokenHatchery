import React, { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const TokensCreated = ({
  tokenCount,
}: {
  tokenCount: {
    erc20: number;
  };
}) => {
  const nodeRef = useRef<HTMLElement>(null);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !inView) return;
    const controls = animate(0, tokenCount.erc20, {
      duration: 3,
      onUpdate(value) {
        node.textContent = value.toFixed();
      },
    });

    return () => controls.stop();
  }, [inView, tokenCount.erc20]);

  return (
    <div className="bg-indigo-800">
      <div className="mx-auto max-w-7xl py-12 px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join the community of creators
          </h2>
          <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
            Number of tokens created on the platform so far and we&apos;re just
            getting started.
          </p>
        </div>
        <dl className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
          <div ref={ref} className="flex flex-col">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
              ERC20
            </dt>
            <dd
              ref={nodeRef}
              className="order-1 text-5xl font-bold tracking-tight text-white"
            >
              0
            </dd>
          </div>
          <div className="mt-10 flex flex-col sm:mt-0">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
              ERC721
            </dt>
            <dd className="order-1 text-5xl font-bold tracking-tight text-white">
              0
            </dd>
          </div>
          <div className="mt-10 flex flex-col sm:mt-0">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
              ERC1155
            </dt>
            <dd className="order-1 text-5xl font-bold tracking-tight text-white">
              0
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
