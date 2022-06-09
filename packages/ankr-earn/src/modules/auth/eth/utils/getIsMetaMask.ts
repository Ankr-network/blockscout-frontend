const METAMASK_WALLET_NAME = 'MetaMask';

export const getIsMetaMask = (walletName?: string): boolean => {
  return walletName === METAMASK_WALLET_NAME;
};
