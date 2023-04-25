interface IGlobalTrustWallet {
  isMetaMask: boolean;
  isTrustWallet: boolean;
  isTrust: boolean;
  enable: () => void;
  request: (args: unknown) => unknown;
}

export const getIsTrustWallet = (
  trustwallet: IGlobalTrustWallet,
): trustwallet is IGlobalTrustWallet => {
  return !!trustwallet?.isTrustWallet || !!trustwallet?.isTrust;
};

export const getIsTrustWalletInjected = (): boolean => {
  const { trustwallet } = window as unknown as {
    trustwallet: IGlobalTrustWallet;
  };

  return !!trustwallet?.isTrustWallet || !!trustwallet?.isTrust;
};
