import { SortType } from 'domains/chains/types';
import { processTestnetOnlyChains } from 'domains/mmChains/screens/Chains/utils/processTestnetOnlyChains';
import { usePrivateChains } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChains';
import { usePrivateChainsData } from 'hooks/usePrivateChainsData';

export const useChains = () => {
  const { chains, allChains, timeframe, timeframeTabs, isLoading, error } =
    usePrivateChainsData();

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
