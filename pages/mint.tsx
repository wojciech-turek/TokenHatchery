import Container from "components/Container/Container";
import React, { useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Button from "components/shared/Button";
import PageHeading from "components/shared/PageHeading/PageHeading";
import { Input } from "../components/NFTMinting/Input";
import { Select } from "../components/NFTMinting/Select";

export const attributeTypes: AttributeOption[] = [
  {
    title: "Text",
    type: "text",
    description:
      "Text based value, can be used for names, descriptions, types etc.",
  },
  {
    title: "Number",
    type: "number",
    description: "Number based value, can be used for prices, quantities etc.",
  },
  {
    title: "Boolean",
    type: "boolean",
    description: "Boolean based value, can be used for true/false values.",
  },
  {
    title: "Date",
    type: "datetime-local",
    description: "Date based value, can be used for dates, times etc.",
  },
];

const Mint = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>();
  const [attributes, setAttributes] = useState<
    { key: string; value: string; type: string }[]
  >([]);

  const handleChange = (e: any) => {
    const selectedFile = e.target.files[0];
    console.log(file);
    setFile(selectedFile);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreviewUrl(fileReader.result?.toString());
    };
    fileReader.readAsDataURL(selectedFile);
  };

  return (
    <Container>
      <PageHeading>Create new token</PageHeading>
      <div className="my-4">
        <span className="font-bold">Collection:</span> Hatchlings
        (0x5d657189A82095996751a763B6bE0dC5a2b80b77)
      </div>
      <div className="mt-8 grid grid-cols-3 gap-8">
        <div className="col-span-1 relative aspect-square w-full">
          {previewUrl ? (
            <div className="relative">
              <div
                onClick={() => setPreviewUrl(null)}
                className="absolute flex items-center justify-center h-full w-full opacity-0 text-white bg-opacity-0 bg-transparent hover:bg-black hover:opacity-100 hover:bg-opacity-50 cursor-pointer transition-all duration-300 ease-in-out"
              >
                Click to remove
              </div>
              <Image
                src={previewUrl}
                alt="preview"
                width={200}
                height={200}
                className="rounded-lg inset-0 h-full w-full object-cover cursor-pointer"
              />
            </div>
          ) : (
            <div className="relative block w-full h-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-gray-400">
              <label
                htmlFor="file-upload"
                className="flex flex-col w-full h-full items-center justify-center cursor-pointer rounded-md font-medium text-gray-500"
              >
                <PhotoIcon className="h-8 w-8" />
                <span>Click to select an image</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  onChange={handleChange}
                  accept="image/*"
                  type="file"
                  className="sr-only"
                />
              </label>
            </div>
          )}
        </div>
        <div className="col-span-2 ml-12">
          <form className="mb-12 flex flex-col gap-6">
            <Input label="Token Name" type="text" name="name" />
            <Input label="Description" type="textarea" name="description" />
            <div className="flex gap-4">
              <div className="grow">
                <Input label="Token ID" type="number" name="tokenId" />
              </div>

              <div className="grow">
                <Input label="Quantity" type="number" name="quantity" />
              </div>
            </div>
            <Input label="Mint to" type="text" name="mintTo" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mt-4">
                Attributes
                <span className="text-gray-500 font-medium"> (optional)</span>
              </h3>
              {attributes.map((attribute, index) => {
                return (
                  <div key={index} className={`flex gap-4 mt-4 items-end`}>
                    <div key={index} className="relative flex gap-4 w-40">
                      <div className="w-full">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Attribute type
                        </label>
                        <Select
                          selectedOption={
                            attributeTypes.find(
                              (type) => type.type === attribute.type
                            ) || attributeTypes[0]
                          }
                          setSelectedOption={(option) =>
                            setAttributes((prevAttributes) => {
                              const newAttributes = [...prevAttributes];
                              newAttributes[index].type = option.type;
                              return newAttributes;
                            })
                          }
                        />
                      </div>
                    </div>
                    <Input
                      value={attribute.key}
                      label="Attribute name"
                      type="text"
                      name="name"
                      onChange={(e) => {
                        setAttributes((prevAttributes) => {
                          const newAttributes = [...prevAttributes];
                          newAttributes[index].key = e.target.value;
                          return newAttributes;
                        });
                      }}
                    />
                    <div className="grow">
                      <Input
                        label="Attribute value"
                        type={attribute.type}
                        name="name"
                        value={attribute.value}
                        onChange={(e) => {
                          setAttributes((prevAttributes) => {
                            const newAttributes = [...prevAttributes];
                            newAttributes[index].value = e.target.value;
                            return newAttributes;
                          });
                        }}
                      />
                    </div>
                    <XMarkIcon
                      width={20}
                      height={20}
                      className="text-red-500 cursor-pointer mt-4"
                      onClick={() => {
                        setAttributes((prevAttributes) => {
                          prevAttributes.splice(index, 1);
                          return [...prevAttributes];
                        });
                      }}
                    />
                  </div>
                );
              })}
              <div>
                <button
                  type="button"
                  className="border border-gray-300 rounded-md mt-8  p-2"
                  onClick={() => {
                    attributes.push({ key: "", value: "", type: "text" });
                    setAttributes([...attributes]);
                  }}
                >
                  Add attribute
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <Button className="w-1/4">Mint</Button>
      </div>
    </Container>
  );
};

export default Mint;

export type InputProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  label: string;
};

type AttributeOption = {
  title: string;
  description: string;
  type: string;
};

export type SelectProps = {
  selectedOption: AttributeOption;
  setSelectedOption: (option: AttributeOption) => void;
};
