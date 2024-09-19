import { Chain, ChainURL } from '@ankr.com/chains-list';

import { Feature } from '../types';

const keysMap: Record<Feature, [keyof Chain, keyof ChainURL]> = {
  [Feature.REST]: ['hasRESTFeature', 'rest'],
  [Feature.RPC]: ['hasRPCFeature', 'rpc'],
  [Feature.ENTERPRISE]: ['hasEnterpriseFeature', 'enterprise'], // TODO: remove enterprise feature (https://github.com/Ankr-network/mrpc-frontend/pull/3941#discussion_r1303938446) (https://ankrnetwork.atlassian.net/browse/MRPC-3691)
};

export const getFeatureKeys = (feature: Feature) => keysMap[feature];
