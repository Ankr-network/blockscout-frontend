import { BlockchainFeature, BlockchainType } from 'multirpc-sdk';

import { Chain, ChainID } from 'domains/chains/types';

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
  isEnterpriseFeatureDisabled: false,
  coinName: 'fakeChain',
  name: 'fakeChain',
  type: BlockchainType.Mainnet,
  features: [BlockchainFeature.RPC],
};
