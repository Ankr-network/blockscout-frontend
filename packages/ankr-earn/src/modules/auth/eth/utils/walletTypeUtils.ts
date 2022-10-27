const METAMASK_WALLET_NAME = 'MetaMask';
const COINBASE_WALLET_NAME = 'Coinbase';
const OKX_WALLET_NAME = 'OKX Wallet';

const getIsValidWallet = (
  walletName: string | undefined,
  key: string,
): boolean => walletName === key;

export const getIsMetaMask = (walletName?: string): boolean => {
  return getIsValidWallet(walletName, METAMASK_WALLET_NAME);
};

export const getIsCoinbase = (walletName?: string): boolean => {
  return getIsValidWallet(walletName, COINBASE_WALLET_NAME);
};

export const getIsOKX = (walletName?: string): boolean => {
  return getIsValidWallet(walletName, OKX_WALLET_NAME);
};

export const getIsInjectedWallet = (walletName?: string): boolean => {
  return (
    getIsMetaMask(walletName) ||
    getIsCoinbase(walletName) ||
    getIsOKX(walletName)
  );
};
