import { SortType } from 'domains/chains/types';
import { processTestnetOnlyChains } from 'domains/mmChains/screens/Chains/utils/processTestnetOnlyChains';
import { useChainsFetchChainNodesDetailQuery } from 'domains/chains/actions/fetchChainNodesDetail';
import { usePrivateChains } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChains';
import { usePrivateChainsData } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChainsData';
import { useUserTotalStats } from './useUserTotalStats';

export const useDashboard = () => {
  const { chains, allChains, timeframe, timeframeTabs, isLoading, error } =
    usePrivateChainsData();

  const { processedChains } = usePrivateChains({
    allChains,
    chains: processTestnetOnlyChains(chains),
    sortType: SortType.Name,
    searchContent: '',
    includeMultichain: true,
  });

  useUserTotalStats();
  useChainsFetchChainNodesDetailQuery();

  return {
    networksConfigurations: processedChains,
    rawChains: chains,
    timeframe,
    timeframeTabs,
    allChains,
    isLoading,
    error,
  };
};
