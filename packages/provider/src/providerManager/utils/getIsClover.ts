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
