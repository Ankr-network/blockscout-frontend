export const isNonNegativeInteger = (input: string): boolean => {
  if (!input.trim()) return false;

  return Number.isInteger(+input) && +input >= 0;
};
