interface IGlobalCoin98 {
  request: (args: unknown) => unknown;
}

export const getIsCoin98 = (coin98: any): coin98 is IGlobalCoin98 => {
  return !!coin98?.isCoin98;
};

export const getIsCoin98Injected = (): boolean => {
  const { coin98, ethereum } = window as any;
  return !!(coin98 && ethereum);
};
