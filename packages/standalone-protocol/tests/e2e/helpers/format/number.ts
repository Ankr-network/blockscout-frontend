import { fixPrecision, powerOfTen } from './math';

export function round(value: number, precision?: number): number {
  if (!precision) {
    return Math.round(value);
  }

  const sign = value < 0 ? -1 : 1;

  const multiplier = powerOfTen(precision);

  return (sign * Math.round(fixPrecision(Math.abs(value) * multiplier))) / multiplier;
}

export function toFixed(value: number, precision = 0): number {
  return parseFloat(round(value, precision).toFixed(precision));
}
