import { useMemo } from 'react';
import { t, tHTML } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { IApiChainURL } from 'domains/chains/api/queryChains';
import { ChainID } from 'modules/chains/types';
import { BlockchainType } from 'multirpc-sdk';
import { Chain } from 'domains/chains/types';

export const getUrls = (chain: Chain) => {
  return [
    ...chain.urls,
    ...(chain.extensions || []).flatMap<IApiChainURL>(
      extension => extension.urls,
    ),
    ...(chain.extenders || []).flatMap<IApiChainURL>(extender => extender.urls),
  ];
};

export const getDummyMessage = (hasPrivateAccess: boolean, length: number) => {
  return t(`chains.links.${hasPrivateAccess ? 'private' : 'public'}`, {
    number: length,
  });
};

const isSuiChain = (chain: Chain) => {
  return chain.id === ChainID.SUI;
};

const getLabelAndTooltip = (chain: Chain) => {
  const isSui = isSuiChain(chain);

  return isSui
    ? [t('chains.beta'), '']
    : [t('chains.archive'), tHTML('chains.archive-tooltip-text')];
};

export const isHighlightedChain = (chain: Chain) => {
  return chain.type === BlockchainType.Customized;
};

export const formatTotalRequests = (totalRequests: BigNumber) => {
  return totalRequests.toString() ?? '';
};

export const useChainsItem = (chain: Chain) => {
  const isSui = isSuiChain(chain);
  const [label, tooltip] = getLabelAndTooltip(chain);

  return {
    isSui,
    label,
    tooltip,
  };
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
