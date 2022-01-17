import { BlockchainNetworkId } from 'modules/common/types';
import { chainIdByTokenMap } from '../const';
import { AvailableTokens } from '../types';

export const getChainIdByToken = (token: AvailableTokens) => {
  return chainIdByTokenMap[token] ?? BlockchainNetworkId.mainnet;
};
