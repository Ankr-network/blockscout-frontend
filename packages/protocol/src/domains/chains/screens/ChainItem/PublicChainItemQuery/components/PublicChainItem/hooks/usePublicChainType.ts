import { useMemo } from 'react';

import { ChainType } from 'domains/chains/types';
import { GroupedEndpoints } from 'modules/endpoints/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { IApiChain } from 'domains/chains/api/queryChains';
import { getPublicChainTypeTabs } from './utils';
import { getInitialChainType } from 'domains/chains/screens/ChainItem/utils/getInitialChainType';

export interface ChainTypeParams {
  chain: IApiChain;
  endpoints: GroupedEndpoints;
  netId?: string;
  isBlockedTestnet: boolean;
  isBlockedMainnet?: boolean;
  onBlockedTabClick: () => void;
}

export interface ChainTypeResult {
  chainType: ChainType;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
}

export const usePublicChainType = ({
  chain,
  endpoints,
  netId,
  isBlockedTestnet,
  isBlockedMainnet,
  onBlockedTabClick,
}: ChainTypeParams): ChainTypeResult => {
  const tabs = useMemo(
    () =>
      getPublicChainTypeTabs({
        endpoints,
        isBlockedTestnet,
        isBlockedMainnet,
        onBlockedTabClick,
      }),
    [endpoints, isBlockedTestnet, onBlockedTabClick, isBlockedMainnet],
  );

  const [chainTypeTabs, chainTypeTab] = useTabs<ChainType>({
    initialTabID: getInitialChainType(
      chain,
      netId,
      chain?.isMainnetPremiumOnly,
    ),
    tabs,
  });

  return {
    chainType: chainTypeTab?.id ?? ChainType.Mainnet,
    chainTypeTab,
    chainTypeTabs,
  };
};
