import { useMemo } from 'react';
import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { EBlockchainType, Chain, ChainURL } from '@ankr.com/chains-list';

export const getUrls = (chain: Chain) => {
  return [
    ...chain.urls,
    ...(chain.extensions || []).flatMap<ChainURL>(extension => extension.urls),
    ...(chain.extenders || []).flatMap<ChainURL>(extender => extender.urls),
  ];
};

export const getDummyMessage = (hasPrivateAccess: boolean, length: number) => {
  return t(`chains.links.${hasPrivateAccess ? 'private' : 'public'}`, {
    number: length,
  });
};

export const isHighlightedChain = (chain: Chain) => {
  return chain.type === EBlockchainType.Customized;
};

export const formatTotalRequests = (totalRequests: BigNumber) => {
  return totalRequests.toString() || '';
};

export const useCommonChainsItemData = (
  chain: Chain,
  totalRequests: BigNumber,
  hasPrivateAccess = false,
) => {
  const isHighlighted = useMemo(() => isHighlightedChain(chain), [chain]);
  const totalRequestsStr = useMemo(
    () => formatTotalRequests(totalRequests),
    [totalRequests],
  );
  const urls = useMemo(() => getUrls(chain), [chain]);
  const dummyMessage = useMemo(
    () => getDummyMessage(hasPrivateAccess, urls.length),
    [hasPrivateAccess, urls],
  );

  return {
    isHighlighted,
    totalRequestsStr,
    urls,
    dummyMessage,
  };
};
