import { getIsEthereum } from './getIsEthereum';

const COINBASE_PROVIDER_KEY = 'CoinbaseWallet';

export const getIsCoinbase = (provider: any): boolean => {
  return !!provider?.isWalletLink;
};

export const getIsCoinbaseInjected = (): boolean => {
  const { ethereum } = window as any;
  if (!getIsEthereum(ethereum)) {
    return false;
  }

  let isCoinbaseWallet = !!ethereum.isCoinbaseWallet;

  if (ethereum.providerMap) {
    const coinbaseProvider = ethereum.providerMap.get(COINBASE_PROVIDER_KEY);

    isCoinbaseWallet = !!coinbaseProvider?.isCoinbaseWallet;
  }

  return isCoinbaseWallet;
};
