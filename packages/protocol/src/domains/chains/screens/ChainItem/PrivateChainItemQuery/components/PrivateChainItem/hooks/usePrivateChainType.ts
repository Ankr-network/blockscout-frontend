import { useMemo } from 'react';

import { ChainType, Chain } from 'domains/chains/types';
import { GroupedEndpoints } from 'modules/endpoints/types';
import { useTabs } from 'modules/common/hooks/useTabs';
import { getInitialChainType } from 'domains/chains/screens/ChainItem/utils/getInitialChainType';
import { getPrivateChainTypeTabs } from './utils';
import { ChainTypeResult } from 'domains/chains/screens/ChainItem/PublicChainItemQuery/components/PublicChainItem/hooks/usePublicChainType';

export interface ChainTypeParams {
  chain: Chain;
  endpoints: GroupedEndpoints;
  netId?: string;
}

export const usePrivateChainType = ({
  chain,
  endpoints,
  netId,
}: ChainTypeParams): ChainTypeResult => {
  const tabs = useMemo(() => getPrivateChainTypeTabs(endpoints), [endpoints]);

  const [chainTypeTabs, chainTypeTab, selectType] = useTabs<ChainType>({
    initialTabID: getInitialChainType(chain, netId),
    tabs,
  });

  return {
    chainType: chainTypeTab?.id ?? ChainType.Mainnet,
    chainTypeTab,
    chainTypeTabs,
    selectType,
  };
};
