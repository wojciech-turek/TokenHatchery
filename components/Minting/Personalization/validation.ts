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
