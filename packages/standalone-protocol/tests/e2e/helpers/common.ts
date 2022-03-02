export const getIntFromString = (value: string): number => {
  return parseInt(value, 10);
};

export const getFloatFromString = (value: string): number => {
  return parseFloat(value.replace(/[A-Z]|[a-z]|≤|≥|\s+/g, '').replace(/,/g, ''));
};

export const getDigitsFromString = (value: string): string => {
  return value.replace(/[A-Z]|[a-z]|≤|≥|\s+/g, '');
};

export const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
