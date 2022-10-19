const METAMASK_WALLET_NAME = 'MetaMask';
const OKX_WALLET_NAME = 'OKX Wallet';

const getIsValidWallet = (
  walletName: string | undefined,
  key: string,
): boolean => walletName === key;

export const getIsMetaMask = (walletName?: string): boolean => {
  return getIsValidWallet(walletName, METAMASK_WALLET_NAME);
};

export const getIsOKX = (walletName?: string): boolean => {
  return getIsValidWallet(walletName, OKX_WALLET_NAME);
};

export const getIsInjectedWallet = (walletName?: string): boolean => {
  return getIsMetaMask(walletName) || getIsOKX(walletName);
};
