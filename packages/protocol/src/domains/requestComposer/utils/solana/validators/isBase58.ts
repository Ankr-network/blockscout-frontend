export const isBase58 = (value: string) =>
  /^[A-HJ-NP-Za-km-z1-9]*$/.test(value);
