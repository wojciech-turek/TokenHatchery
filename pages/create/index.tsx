import React from "react";
import { useRouter } from "next/router";
import Container from "components/Container/Container";
import { tokenTypes } from "constants/availableTokenTypes";
import PageHeading from "components/shared/PageHeading/PageHeading";
import { CheckIcon } from "@heroicons/react/24/outline";
import Button from "components/shared/Button";
import { motion } from "framer-motion";

const Create = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Container>
      <PageHeading>Choose token type</PageHeading>
      <p className="mt-6 max-w-2xl text-xl text-gray-500">
        Choose from any of the available token types and start minting in just a
        few simple steps. Get started today and create your own unique digital
        asset!
      </p>
      <div className="mt-12 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
        {tokenTypes.map((contractType, index) => (
          <motion.div
            key={contractType.name}
            className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: isMobile ? 1 : 1.05 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            transition={{
              y: { duration: (index + 1) * 0.2 },
              duration: isMobile ? 0 : 0.1,
            }}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-semibold text-gray-900">
                {contractType.type}
              </h3>
              <p className="mt-4 text-gray-900 flex items-center">
                <span className="text-5xl font-bold tracking-tight">
                  {contractType.name}
                </span>
                {!contractType.enabled ? (
                  <span className="inline-flex items-center rounded-full bg-yellow-100 ml-2 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    Coming Soon
                  </span>
                ) : null}
              </p>
              <p className="mt-6 text-gray-500 lg:h-40">
                {contractType.description}
              </p>
              <p className="mt-6 text-gray-700 text-xl font-bold tracking-tight">
                Available extensions
              </p>
              <ul role="list" className="mt-6 space-y-4">
                {contractType.extensions.map((extension) => (
                  <li key={extension.name} className="flex">
                    <CheckIcon
                      className="h- w-6 flex-shrink-0 text-indigo-500"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-gray-500">{extension.name}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gray-700 text-xl font-bold tracking-tight">
                Access control types
              </p>
              <ul role="list" className="mt-6 space-y-6">
                {contractType.accessControl.map((accessControl) => (
                  <li key={accessControl} className="flex">
                    <CheckIcon
                      className="h-6 w-6 flex-shrink-0 text-indigo-500"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-gray-500">{accessControl}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <div className="mt-6">
                  <Button
                    disabled={!contractType.enabled}
                    fullWidth
                    onClick={() => navigateTo(contractType.link)}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Container>
        <p className=" text-gray-900">
          If you require custom built contract with special features,
          <a href="mailto: contact@wojciechturek.com">
            <span style={{ fontWeight: "bold" }}>
              {" "}
              click here to contact me.
            </span>
          </a>
        </p>
      </Container>
    </Container>
  );
};

export default Create;
