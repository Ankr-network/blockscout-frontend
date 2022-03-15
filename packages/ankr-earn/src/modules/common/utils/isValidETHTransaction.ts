export const isValidETHTransaction = (str: string): boolean => {
  return /^0x([A-Fa-f0-9]{64})$/.test(str);
};
