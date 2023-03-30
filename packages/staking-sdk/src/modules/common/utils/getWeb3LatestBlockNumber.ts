import { Web3KeyReadProvider } from '@ankr.com/provider';

import { IWeb3LatestBlockNumberProps } from '../types';

/**
 * Get the latest block number from Web3.
 *
 * @param {Provider} provider - current selected provider
 * @returns {Promise<number>}
 */
export const getWeb3LatestBlockNumber = <Provider extends Web3KeyReadProvider>({
  provider,
}: IWeb3LatestBlockNumberProps<Provider>): Promise<number> => {
  const web3 = provider.getWeb3();

  return web3.eth.getBlockNumber();
};
