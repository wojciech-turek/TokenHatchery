import SubHeading from "components/SubHeading/SubHeading";
import { accessControl } from "constants/availableTokenTypes";
import React, { useEffect } from "react";

import { TokenData } from "types/tokens";
import { classNames } from "utils/client/classNames";
import Fader from "components/Fader/Fader";
import { Extension } from "types/extensions";

const ExtensionSelect = ({
  extensions,
  tokenData,
  setTokenData,
  setStepComplete,
}: {
  extensions: Extension[];
  tokenData: TokenData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}) => {
  const handleSelect = (ext: Extension) => {
    let selectedExtensions = tokenData?.extensions || [];
    if (!selectedExtensions.includes(ext.name)) {
      selectedExtensions.push(ext.name);
      if (ext.require) {
        ext.require.forEach((req) => {
          if (!selectedExtensions.includes(req)) {
            selectedExtensions.push(req);
          }
        });
      }
    } else {
      selectedExtensions = selectedExtensions.filter(
        (name) => name !== ext.name
      );
    }

    setTokenData({ ...tokenData, extensions: selectedExtensions });
  };

  useEffect(() => {
    setStepComplete(true);
  }, [setStepComplete]);

  return (
    <>
      <Fader>
        <div>
          <SubHeading>Select extensions</SubHeading>
          <p className="text-sm font-medium text-gray-700 mb-12">
            You may want to add extrea functionalities to your token, the will
            expand its use or allow for more complex management. Selecting
            extensions is optional.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {extensions.map((extension) => (
              <div
                key={extension.name}
                onClick={() => handleSelect(extension)}
                className={classNames(
                  tokenData?.extensions?.includes(extension.name)
                    ? "border-indigo-600"
                    : "border-gray-300 hover:border-gray-400",
                  "relative flex items-center space-x-3 rounded-lg border bg-white px-6 py-5 shadow-sm cursor-pointer"
                )}
              >
                <div className="px-2">
                  <input
                    type="checkbox"
                    value={extension.name}
                    checked={
                      tokenData?.extensions?.includes(extension.name) || false
                    }
                    onChange={() => handleSelect(extension)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center relative">
                    <p className="text-lg font-medium text-gray-900">
                      {extension.name}
                    </p>
                    {extension.advanced && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 relative -top-2">
                        Advanced option
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {extension.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <SubHeading className="mb-12">Select management type</SubHeading>
          <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {accessControl.map((controlType) => (
              <div
                key={controlType.name}
                onClick={() =>
                  setTokenData({
                    ...tokenData,
                    managementType: controlType.type,
                  })
                }
                className={classNames(
                  tokenData?.managementType === controlType.type
                    ? "border-indigo-600"
                    : "border-gray-300 hover:border-gray-400",
                  "relative flex items-center space-x-3 rounded-lg border bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2  cursor-pointer"
                )}
              >
                <div className="px-2">
                  <input
                    type="radio"
                    value={controlType.type}
                    checked={
                      tokenData?.managementType === controlType.type || false
                    }
                    onChange={() =>
                      setTokenData({
                        ...tokenData,
                        managementType: controlType.type,
                      })
                    }
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-medium text-gray-900">
                    {controlType.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {controlType.description}
                  </p>
                </div>
              </div>
            ))}
          </fieldset>
        </div>
      </Fader>
    </>
  );
};

export default ExtensionSelect;
