import { EBlockchain, ethNetworkIdByBlockchainMap } from 'multirpc-sdk';
import { RPC_URLS_BY_NETWORK } from '@ankr.com/provider';

export const getWeb3RpcUrlByNetwork = (network: EBlockchain) => {
  const ethNetworkId = ethNetworkIdByBlockchainMap[network];

  return RPC_URLS_BY_NETWORK[ethNetworkId as keyof typeof RPC_URLS_BY_NETWORK];
};
