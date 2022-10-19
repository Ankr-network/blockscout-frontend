import { API_ENV, getExpectedChainId } from 'modules/common/utils/environment';
import { EEthereumNetworkId } from '@ankr.com/provider-core';

export const getExplorerLink = (transactionId = '') => {
  const chainId = getExpectedChainId(API_ENV);

  if (chainId === EEthereumNetworkId.mainnet) {
    return `https://etherscan.io/tx/${transactionId}`;
  }

  return `https://goerli.etherscan.io/tx/${transactionId}`;
};
