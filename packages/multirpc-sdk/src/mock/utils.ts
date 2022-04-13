export const createArray = <T extends Record<string, any>>(
  count: number,
  createItem: (...args: any) => T,
) => {
  return Array(count).fill(undefined).map(createItem);
};
