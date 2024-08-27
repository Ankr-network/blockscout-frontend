import { SortType, Timeframe } from 'modules/chains/types';
import { processTestnetOnlyChains } from 'domains/mmChains/screens/Chains/utils/processTestnetOnlyChains';
import { usePrivateChains } from 'domains/chains/screens/ChainsListPage/components/PrivateChains/hooks/usePrivateChains';
import { usePrivateChainsData } from 'hooks/usePrivateChainsData';

export const useChains = (timeframes?: Timeframe[]) => {
  const { allChains, chains, error, isLoading, timeframe, timeframeTabs } =
    usePrivateChainsData({ timeframes });

  const { processedChains } = usePrivateChains({
    allChains,
    chains: processTestnetOnlyChains(chains),
    sortType: SortType.Name,
    searchContent: '',
    includeMultichain: true,
  });

  return {
    processedChains,
    chains,
    timeframe,
    timeframeTabs,
    allChains,
    isLoading,
    error,
  };
};
