import Container from "components/Container/Container";
import React, { useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Input from "components/shared/Input";
import Button from "components/shared/Button";

const Mint = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>();
  const [attributes, setAttributes] = useState<
    { key: string; value: string }[]
  >([]);

  const handleChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreviewUrl(fileReader.result?.toString());
    };
    fileReader.readAsDataURL(selectedFile);
  };

  console.log(file);

  return (
    <Container>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 relative aspect-square w-full">
          {previewUrl ? (
            <>
              <div
                onClick={() => setPreviewUrl(null)}
                className="absolute flex items-center justify-center h-full w-full text-transparent hover:text-white bg-opacity-0 bg-transparent hover:bg-black hover:bg-opacity-50 cursor-pointer transition-all duration-300 ease-in-out"
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
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full border-8 border-dashed ">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
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
          <form className="">
            <Input type="text" name="Name" />
            <Input type="text" name="Description" />
          </form>
          {attributes.map((attribute, index) => {
            return (
              <div key={index} className="flex gap-4 items-center">
                <Input
                  type="text"
                  name="Attribute key"
                  value={attribute.key}
                  onChange={(e) => {
                    setAttributes((prevAttributes) => {
                      if (!prevAttributes[index]) {
                        prevAttributes[index] = {
                          key: e.target.value,
                          value: "",
                        };
                      } else {
                        prevAttributes[index].key = e.target.value;
                      }
                      return [...prevAttributes];
                    });
                  }}
                />
                <Input
                  type="text"
                  name="Attribute value"
                  value={attribute.value}
                  onChange={(e) => {
                    setAttributes((prevAttributes) => {
                      if (!prevAttributes[index]) {
                        prevAttributes[index] = {
                          key: "",
                          value: e.target.value,
                        };
                      } else {
                        prevAttributes[index].value = e.target.value;
                      }
                      return [...prevAttributes];
                    });
                  }}
                />
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
              className="border border-gray-300 rounded-md p-2"
              onClick={() => {
                attributes.push({ key: "", value: "" });
                setAttributes([...attributes]);
              }}
            >
              Add attribute
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <Button className="w-32">Mint</Button>
      </div>
    </Container>
  );
};

export default Mint;
