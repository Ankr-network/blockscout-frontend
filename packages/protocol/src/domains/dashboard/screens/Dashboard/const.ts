import { BlockchainFeature, BlockchainType } from 'multirpc-sdk';

import { Chain, ChainID } from 'domains/chains/types';

// fallback chain is used for initializing the ChainProtocolContext when chain is not selected
export const fallbackChain: Chain = {
  id: ChainID.UNDEFINED,
  isComingSoon: false,
  urls: [
    {
      rpc: 'fakeChainUrl',
    },
  ],
  hasWSFeature: false,
  hasRESTFeature: false,
  hasRPCFeature: false,
  coinName: 'fakeChain',
  name: 'fakeChain',
  type: BlockchainType.Mainnet,
  features: [BlockchainFeature.RPC],
};

// until mobile version is ready, we hide the dashboard on mobile
export const IS_DASHBOARD_HIDDEN_ON_MOBILE = true;
