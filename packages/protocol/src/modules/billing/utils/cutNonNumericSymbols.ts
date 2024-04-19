export const cutNonNumericSymbols = (value: string) => {
  return value.replace(/[^0-9.]/g, '');
};
