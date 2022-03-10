import chroma from 'chroma-js';

/**
 * @description Returns a Hex() string representation of RGB in upper case
 * @param rgb string
 * @example
 * toHex('rgb(68, 70, 239)') === #4446EF
 */
export const toHex = (rgb: string): string => {
  return chroma(rgb).hex().toUpperCase();
};

/**
 * @description Returns a RGB() string representation of Hex
 * @param hex string
 * @example
 * toRGB('#4446EF') === rgb(68, 70, 239)
 */
export const toRGB = (hex: string): string => {
  const colorNumbers = chroma(hex).rgb();
  return `rgb(${colorNumbers.join(', ')})`;
};
