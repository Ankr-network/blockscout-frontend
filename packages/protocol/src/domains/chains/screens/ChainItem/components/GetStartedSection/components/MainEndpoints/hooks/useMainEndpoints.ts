import { useMemo } from 'react';

import { ChainID } from 'domains/chains/types';
import { Feature, MainEndpointsProps } from '../types';
import { getFeatureKeys } from '../utils/getFeatureKeys';
import { getFlattenURLs } from '../utils/getFlattenURLs';
import { getTitle } from '../utils/getTitle';
import { hasPlaceholder as checkPlaceholder } from '../utils/hasPlaceholder';
import { getSubChainFromGroup } from 'domains/chains/utils/getSubChainFromGroup';

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
  const { urls } = group;
  const isMultiChain = publicChain.id === ChainID.MULTICHAIN;

  const subChain = getSubChainFromGroup(group);

  const hasPlaceholder = useMemo(
    () => checkPlaceholder(subChain, hasPrivateAccess),
    [hasPrivateAccess, subChain],
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
    () => getTitle({ isMultiChain, urlsCount }),
    [isMultiChain, urlsCount],
  );

  const hasFeature = subChain?.[featureKey];

  return { flattenURLs, hasFeature, hasPlaceholder, title };
};
