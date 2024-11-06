import { ESortChainsType, Timeframe } from '@ankr.com/chains-list';

import { processTestnetOnlyChains } from 'modules/chains/utils/processTestnetOnlyChains';
import { usePrivateChains } from 'domains/chains/screens/ChainsListPage/components/PrivateChains/hooks/usePrivateChains';
import { usePrivateChainsData } from 'hooks/usePrivateChainsData';

export const useChains = (timeframes?: Timeframe[]) => {
  const { chains, stats, statsError, statsLoading, timeframe, timeframeTabs } =
    usePrivateChainsData({ timeframes });

  const { processedChains } = usePrivateChains({
    chains: processTestnetOnlyChains(chains),
    includeMultichain: true,
    searchContent: '',
    sortType: ESortChainsType.NameAZ,
    stats,
  });

  return {
    chains,
    error: statsError,
    isLoading: statsLoading,
    processedChains,
    timeframe,
    timeframeTabs,
  };
};
