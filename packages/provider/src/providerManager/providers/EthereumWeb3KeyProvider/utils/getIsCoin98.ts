interface IGlobalCoin98 {
  provider: {
    request: (args: unknown) => unknown;
  };
}

export const getIsCoin98 = (coin98: any): coin98 is IGlobalCoin98 => {
  return !!coin98?.provider?.request;
};
