import { useCallback } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { Tab } from 'uiKit/TabsManager';
import { TabId } from '../ChainItemTabsUtils';
import { hasEvmEndpoints } from 'modules/endpoints/utils/hasEvmEndpoints';
import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';

export type TabsFilter = [boolean, (tab: Tab) => boolean];

export const useTabsFilter = (chain: IApiChain): TabsFilter => {
  const endpoints = useGroupedEndpoints(chain);
  const isChainEvmBased = hasEvmEndpoints(endpoints);

  const filter = useCallback(
    ({ id }: Tab) => id !== TabId.GetStarted || isChainEvmBased,
    [isChainEvmBased],
  );

  return [isChainEvmBased, filter];
};
