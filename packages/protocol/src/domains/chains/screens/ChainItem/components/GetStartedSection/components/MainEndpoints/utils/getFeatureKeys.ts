import { Feature } from '../types';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';

const keysMap: Record<Feature, [keyof IApiChain, keyof IApiChainURL]> = {
  [Feature.REST]: ['hasRESTFeature', 'rest'],
  [Feature.RPC]: ['hasRPCFeature', 'rpc'],
};

export const getFeatureKeys = (feature: Feature) => keysMap[feature];
