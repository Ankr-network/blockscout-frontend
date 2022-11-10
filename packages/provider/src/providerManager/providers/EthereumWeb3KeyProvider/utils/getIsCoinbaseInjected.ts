import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import { getIsEthereum } from './getIsEthereum';

const COINBASE_PROVIDER_KEY = 'CoinbaseWallet';

export const getIsCoinbaseInjected = (): boolean => {
  if (!getIsEthereum(window.ethereum)) {
    return false;
  }

  let isCoinbaseWallet = !!window.ethereum.isCoinbaseWallet;

  if (window.ethereum.providerMap) {
    const coinbaseProvider = window.ethereum.providerMap.get(
      COINBASE_PROVIDER_KEY,
    );

    isCoinbaseWallet = !!coinbaseProvider?.isCoinbaseWallet;
  }

  return Web3KeyReadProvider.isInjected() && isCoinbaseWallet;
};
