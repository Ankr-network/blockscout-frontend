export const getIsOKXInjected = (): boolean => {
  return !!(window as unknown as { okexchain: unknown }).okexchain;
};
