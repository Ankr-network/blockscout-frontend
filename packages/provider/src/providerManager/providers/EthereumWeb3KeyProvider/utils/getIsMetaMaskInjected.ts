import { Web3KeyReadProvider } from '@ankr.com/provider-core';

import { getIsEthereum } from './getIsEthereum';

export const getIsMetaMaskInjected = (): boolean => {
  if (!getIsEthereum(window.ethereum)) {
    return false;
  }

  const { isMetaMask, isOKExWallet } = window.ethereum;

  return Web3KeyReadProvider.isInjected() && !!isMetaMask && !isOKExWallet;
};
