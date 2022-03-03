export function fixPrecision(value: number, fixedDigits = 12): number {
  return parseFloat(value.toPrecision(fixedDigits));
}

export function log10(n: number): number {
  return Math.log(n) / Math.log(10);
}

export function double(num: number): number {
  return num * 2;
}

export function powerOfTen(pow: number): number {
  return Math.pow(10, pow);
}

export function parseInt10(num: string): number {
  return parseInt(num, 10);
}

export function fromPercent(num: number) {
  return num / 100;
}

export function toPercent(num: number) {
  return fixPrecision(num * 100);
}
