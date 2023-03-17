import { Web3KeyReadProvider } from '@ankr.com/provider';

import { getIsHttpProvider } from './getIsHttpProvider';

/**
 * Function to check if read providers are the same.
 *
 * @param {Web3KeyReadProvider} readProvider - current read provider
 * @param {Web3KeyReadProvider} newReadProvider - new read provider
 * @returns {boolean} true if providers are the same.
 */
export const getIsSameReadProvider = (
  readProvider?: Web3KeyReadProvider,
  newReadProvider?: Web3KeyReadProvider,
): boolean => {
  if (!readProvider || !newReadProvider) {
    return false;
  }

  if (newReadProvider === readProvider) {
    return true;
  }

  const web3 = readProvider.getWeb3();
  const newWeb3 = newReadProvider.getWeb3();
  const provider = web3.eth.currentProvider;
  const newProvider = newWeb3.eth.currentProvider;

  if (getIsHttpProvider(provider) && getIsHttpProvider(newProvider)) {
    return provider.host === newProvider.host;
  }

  return false;
};
