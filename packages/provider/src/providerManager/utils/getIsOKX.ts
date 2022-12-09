interface IGlobalOKX {
  isOKExWallet: boolean;
  enable: () => Promise<void>;
}

export const getIsOKX = (okexchain: any): okexchain is IGlobalOKX => {
  return !!okexchain?.isOKExWallet;
};

export const getIsOKXInjected = (): boolean => {
  return !!(window as unknown as { okexchain: unknown }).okexchain;
};
