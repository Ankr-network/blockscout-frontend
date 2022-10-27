interface IGlobalEthereum {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isOKExWallet?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  providerMap?: Map<string, any>;
}

export const getIsEthereum = (
  ethereum: unknown,
): ethereum is IGlobalEthereum => {
  return !!ethereum;
};
