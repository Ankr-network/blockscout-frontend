import { API_ENV, getExpectedChainId } from 'modules/common/utils/environment';
import { ChainId } from '@ankr.com/stakefi-web3';

export const getExplorerLink = (transactionId = '') => {
  const chainId = getExpectedChainId(API_ENV);

  if (chainId === ChainId.Ethereum) {
    return `https://etherscan.io/tx/${transactionId}`;
  }

  return `https://goerli.etherscan.io/tx/${transactionId}`;
};
