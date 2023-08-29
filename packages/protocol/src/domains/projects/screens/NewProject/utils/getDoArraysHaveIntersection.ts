export const getDoArraysHaveIntersection = (
  array1: string[],
  array2: string[],
) => {
  return array1.filter(x => !array2.includes(x)).length > 0;
};
