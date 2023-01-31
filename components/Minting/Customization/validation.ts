import { ethers } from "ethers";

export const validateInput = (val: string) => {
  if (val === "") return false;
  const value = val.trim();
  const regex = /^[a-zA-Z]{2,16}$/;
  return regex.test(value);
};

export const validateNumber = (val: string | undefined) => {
  if (val === "") return false;
  const value = Number(val);
  return Number.isInteger(value) && value > 0;
};

export const validateURL = (val: string) => {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/$/;
  return urlRegex.test(val);
};

export const validateAddress = (val: string) => {
  return ethers.utils.isAddress(val);
};
