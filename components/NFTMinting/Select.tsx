import React, { Fragment } from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";
import { classNames } from "utils/client/classNames";
import { SelectProps, attributeTypes } from "../../pages/mint";

export const Select = ({ selectedOption, setSelectedOption }: SelectProps) => {
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <>
          <div>
            <div className="flex w-full justify-end divide-x divide-indigo-600 bg-gray-50 border-b border-gray-300">
              <div className="flex divide-x">
                <div className="flex items-center py-2 pl-3 pr-4">
                  <p className="ml-2.5 text-lg font-medium">
                    {selectedOption.title}
                  </p>
                </div>
                <Listbox.Button className="flex items-center rounded-l-none rounded-r-md p-2 text-sm font-medium hover:bg-gray-50">
                  <ChevronDownIcon className="h-5 w-5 " aria-hidden="true" />
                </Listbox.Button>
              </div>
            </div>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-4 z-10 mt-2 w-36 divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {attributeTypes.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-500" : "text-gray-900",
                        "cursor-default select-none p-4 text-sm"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? "font-semibold" : "font-normal"
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? "text-white" : "text-indigo-500"
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
