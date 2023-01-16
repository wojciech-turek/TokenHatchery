export const validateInput = (val: string) => {
  if (val === "") return false;
  const value = val.trim();
  const regex = /^[a-zA-Z]{2,10}$/;
  return regex.test(value);
};

export const validateNumber = (val: string | undefined) => {
  if (val === "") return false;
  const value = Number(val);
  return Number.isInteger(value) && value > 0;
};

export const validateURL = (val: string) => {
  const urlRegex =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}[-a-zA-Z0-9()@:%_\+.~#?&//=]*/;
  return urlRegex.test(val);
};
