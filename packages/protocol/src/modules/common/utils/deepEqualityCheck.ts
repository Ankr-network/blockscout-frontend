export const deepEqulityCheck = (a: unknown, b: unknown) =>
  JSON.stringify(a) === JSON.stringify(b);
