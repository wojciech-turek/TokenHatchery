import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const TokensCreated = ({
  tokenCount,
}: {
  tokenCount: {
    erc20: number;
    erc721: number;
    erc1155: number;
  };
}) => {
  const erc20Ref = useRef<HTMLElement>(null);
  const erc721Ref = useRef<HTMLElement>(null);
  const erc1155Ref = useRef<HTMLElement>(null);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    const erc20node = erc20Ref.current;
    const erc721node = erc721Ref.current;
    const erc1155node = erc1155Ref.current;

    if (!erc20node || !inView) return;
    const erc20controls = animate(0, tokenCount.erc20, {
      duration: 3,
      onUpdate(value) {
        erc20node.textContent = value.toFixed();
      },
    });
    if (!erc721node || !inView) return;
    const erc721controls = animate(0, tokenCount.erc721, {
      duration: 3,
      onUpdate(value) {
        erc721node.textContent = value.toFixed();
      },
    });

    if (!erc1155node || !inView) return;
    const erc1155controls = animate(0, tokenCount.erc1155, {
      duration: 3,
      onUpdate(value) {
        erc1155node.textContent = value.toFixed();
      },
    });

    return () => {
      erc20controls.stop();
      erc721controls.stop();
      erc1155controls.stop();
    };
  }, [inView, tokenCount.erc20, tokenCount.erc721, tokenCount.erc1155]);

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
              ref={erc20Ref}
              className="order-1 text-5xl font-bold tracking-tight text-white"
            >
              0
            </dd>
          </div>
          <div className="mt-10 flex flex-col sm:mt-0">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
              ERC721
            </dt>
            <dd
              ref={erc721Ref}
              className="order-1 text-5xl font-bold tracking-tight text-white"
            >
              0
            </dd>
          </div>
          <div className="mt-10 flex flex-col sm:mt-0">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
              ERC1155
            </dt>
            <dd
              ref={erc1155Ref}
              className="order-1 text-5xl font-bold tracking-tight text-white"
            >
              0
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
