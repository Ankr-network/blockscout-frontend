interface IGlobalClover {
  enable: () => void;
  request: (args: unknown) => unknown;
  isClover: boolean;
}

export const getIsClover = (clover: any): clover is IGlobalClover => {
  return !!clover?.isClover;
};

export const getIsCloverInjected = (): boolean => {
  const { clover } = window as any;
  return !!clover;
};

export const getCloverProvider = (): IGlobalClover | undefined => {
  let { clover: provider } = window as any;

  const isModifiedByCoinbase = !!(
    provider &&
    Array.isArray(provider.providers) &&
    provider.providers.length > 0
  );

  if (isModifiedByCoinbase) {
    provider = (provider.providers as any[]).find(({ isClover }) => !!isClover);
  }

  return provider;
};
