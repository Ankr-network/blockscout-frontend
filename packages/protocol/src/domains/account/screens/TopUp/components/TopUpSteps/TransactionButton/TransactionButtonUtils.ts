import { EEthereumNetworkId } from '@ankr.com/provider';

import { API_ENV, getExpectedChainId } from 'modules/common/utils/environment';

export const getExplorerLink = (transactionId = '') => {
  const chainId = getExpectedChainId(API_ENV);

  if (chainId === EEthereumNetworkId.mainnet) {
    return `https://etherscan.io/tx/${transactionId}`;
  }

  return `https://holesky.etherscan.io/tx/${transactionId}`;
};
