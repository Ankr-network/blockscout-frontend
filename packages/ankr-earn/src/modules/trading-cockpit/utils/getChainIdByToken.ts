import { EEthereumNetworkId } from 'modules/common/types';

import { chainIdByTokenMap } from '../const';
import { AvailableTokens } from '../types';

export const getChainIdByToken = (
  token: AvailableTokens,
): EEthereumNetworkId => {
  return chainIdByTokenMap[token] ?? EEthereumNetworkId.mainnet;
};
