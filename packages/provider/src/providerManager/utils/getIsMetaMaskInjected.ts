import { getIsEthereum } from './getIsEthereum';

export const getIsMetaMaskInjected = (): boolean => {
  const { ethereum } = window as any;
  if (!getIsEthereum(ethereum)) {
    return false;
  }

  return !!ethereum.isMetaMask && !ethereum.isOKExWallet;
};
