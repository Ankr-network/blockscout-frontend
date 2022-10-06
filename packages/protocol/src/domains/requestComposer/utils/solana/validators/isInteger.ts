import { isNumber } from './isNumber';

export const isInteger = (value: string) =>
  isNumber(value) && Number.isInteger(Number(value));
