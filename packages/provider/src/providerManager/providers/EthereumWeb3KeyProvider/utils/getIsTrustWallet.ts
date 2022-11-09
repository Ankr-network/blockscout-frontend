interface IGlobalTrustWallet {
  isMetaMask: boolean;
  isTrustWallet: boolean;
  enable: () => void;
  request: (args: unknown) => unknown;
}

export const getIsTrustWallet = (
  trustwallet: IGlobalTrustWallet,
): trustwallet is IGlobalTrustWallet => {
  return !!trustwallet;
};

export const getIsTrustWalletInjected = (): boolean => {
  const { trustwallet } = window as unknown as {
    trustwallet: IGlobalTrustWallet;
  };

  return !!trustwallet && trustwallet.isTrustWallet;
};
