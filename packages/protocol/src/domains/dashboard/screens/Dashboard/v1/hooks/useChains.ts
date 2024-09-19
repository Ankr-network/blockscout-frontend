import { ESortChainsType, Timeframe } from '@ankr.com/chains-list';

import { processTestnetOnlyChains } from 'modules/chains/utils/processTestnetOnlyChains';
import { usePrivateChains } from 'domains/chains/screens/ChainsListPage/components/PrivateChains/hooks/usePrivateChains';
import { usePrivateChainsData } from 'hooks/usePrivateChainsData';

export const useChains = (timeframes?: Timeframe[]) => {
  const { chains, error, isLoading, timeframe, timeframeTabs } =
    usePrivateChainsData({ timeframes });

  const { processedChains } = usePrivateChains({
    chains: processTestnetOnlyChains(chains),
    sortType: ESortChainsType.NameAZ,
    searchContent: '',
    includeMultichain: true,
  });

  return {
    processedChains,
    chains,
    timeframe,
    timeframeTabs,
    isLoading,
    error,
  };
};
