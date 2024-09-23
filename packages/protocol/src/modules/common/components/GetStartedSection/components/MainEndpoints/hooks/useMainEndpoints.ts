import { useMemo } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { getSubChainFromGroup } from 'domains/chains/utils/getSubChainFromGroup';

import { Feature, MainEndpointsProps } from '../types';
import { getFeatureKeys } from '../utils/getFeatureKeys';
import { getFlattenURLs } from '../utils/getFlattenURLs';
import { getTitle } from '../utils/getTitle';
import { hasPlaceholder as checkPlaceholder } from '../utils/hasPlaceholder';

export type MainEndpointsHookParams = Omit<
  MainEndpointsProps,
  'hasConnectWalletMessage' | 'onCopyEndpoint'
>;

export const useMainEndpoints = ({
  feature = Feature.RPC,
  group,
  hasPremium,
  hasPrivateAccess,
  publicChain,
}: MainEndpointsHookParams) => {
  const { urls } = group;
  const isMultiChain = publicChain.id === ChainID.MULTICHAIN;
  const isEnterprise = feature === Feature.ENTERPRISE;

  const subChain = getSubChainFromGroup(group);

  const hasPlaceholder = useMemo(() => {
    if (isEnterprise) return false;

    return checkPlaceholder(subChain, hasPrivateAccess && hasPremium);
  }, [hasPrivateAccess, subChain, hasPremium, isEnterprise]);

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
