import { Web3KeyReadProvider } from '@ankr.com/provider-core';

import { getIsEthereum } from './getIsEthereum';

const COINBASE_PROVIDER_KEY = 'CoinbaseWallet';

export const getIsMetamaskInjected = (): boolean => {
  if (!getIsEthereum(window.ethereum)) {
    return false;
  }

  const { isMetaMask, isOKExWallet } = window.ethereum;

  return Web3KeyReadProvider.isInjected() && !!isMetaMask && !isOKExWallet;
};

export const getIsCoinbaseInjected = (): boolean => {
  if (!getIsEthereum(window.ethereum)) {
    return false;
  }

  let isCoinbaseWallet = !!window.ethereum.isCoinbaseWallet;

  if (window.ethereum.providerMap) {
    const coinbaseProvider: { isCoinbaseWallet: boolean } =
      window.ethereum.providerMap.get(COINBASE_PROVIDER_KEY);

    isCoinbaseWallet = coinbaseProvider.isCoinbaseWallet;
  }

  return Web3KeyReadProvider.isInjected() && isCoinbaseWallet;
};

export const getIsOKXInjected = (): boolean => {
  return typeof window.okexchain !== 'undefined';
};
