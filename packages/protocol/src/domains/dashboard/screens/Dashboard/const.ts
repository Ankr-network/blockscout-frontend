import { BlockchainFeature, BlockchainType } from 'multirpc-sdk';

import { Chain, ChainID, Timeframe } from 'modules/chains/types';

export const timeframesMap: Record<Timeframe, string> = {
  [Timeframe.Day]: 'day',
  [Timeframe.Hour]: 'hour',
  [Timeframe.Week]: 'week',
  [Timeframe.Month]: 'month',
};

// fallback chain is used for initializing the ChainProtocolContext when chain is not selected
export const fallbackChain: Chain = {
  id: ChainID.UNDEFINED,
  isComingSoon: false,
  urls: [
    {
      rpc: 'fakeChainUrl',
      enterprise: 'fakeEnterpriseChainUrl',
      enterpriseWs: 'fakeEnterpriseWsUrl',
    },
  ],
  hasWSFeature: false,
  hasRESTFeature: false,
  hasRPCFeature: false,
  hasEnterpriseFeature: false,
  coinName: '',
  name: 'fakeChain',
  type: BlockchainType.Mainnet,
  features: [BlockchainFeature.RPC],
};
