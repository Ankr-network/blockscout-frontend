import { useMemo } from 'react';

import { ChainID } from 'domains/chains/types';
import { Feature, MainEndpointsProps } from '../types';
import { getFeatureKeys } from '../utils/getFeatureKeys';
import { getFlattenURLs } from '../utils/getFlattenURLs';
import { getTitle } from '../utils/getTitle';
import { hasPlaceholder as checkPlaceholder } from '../utils/hasPlaceholder';

export type MainEndpointsHookParams = Omit<
  MainEndpointsProps,
  'hasConnectWalletMessage' | 'hasPremium' | 'onCopyEndpoint'
>;

export const useMainEndpoints = ({
  feature = Feature.RPC,
  group,
  hasPrivateAccess,
  publicChain,
}: MainEndpointsHookParams) => {
  const { urls, chainName, chains: [subchain] = [] } = group;
  const isMultiChain = publicChain.id === ChainID.MULTICHAIN;

  const hasPlaceholder = useMemo(
    () => checkPlaceholder(subchain, hasPrivateAccess),
    [hasPrivateAccess, subchain],
  );

  const [featureKey, urlKey] = useMemo(
    () => getFeatureKeys(feature),
    [feature],
  );

  const [flattenURLs, urlsCount] = useMemo(
    () => getFlattenURLs({ urlKey, urls }),
    [urlKey, urls],
  );

  const title = useMemo(
    () => getTitle({ chainName, isMultiChain, urlsCount }),
    [isMultiChain, chainName, urlsCount],
  );

  const hasFeature = subchain?.[featureKey];

  return { flattenURLs, hasFeature, hasPlaceholder, title };
};
