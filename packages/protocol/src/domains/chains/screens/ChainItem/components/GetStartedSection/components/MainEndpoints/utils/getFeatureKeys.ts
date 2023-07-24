import { Chain, ChainURL } from 'domains/chains/types';

import { Feature } from '../types';

const keysMap: Record<Feature, [keyof Chain, keyof ChainURL]> = {
  [Feature.REST]: ['hasRESTFeature', 'rest'],
  [Feature.RPC]: ['hasRPCFeature', 'rpc'],
};

export const getFeatureKeys = (feature: Feature) => keysMap[feature];
