interface IProvider {
  isCoinbaseWallet?: boolean;
}

interface IGlobalEthereum {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isOKExWallet?: boolean;
  providerMap?: Map<string, IProvider>;
  request: (args: unknown) => unknown;
}

export const getIsEthereum = (
  ethereum: unknown,
): ethereum is IGlobalEthereum => {
  return !!ethereum;
};
