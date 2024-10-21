import { useChainsFetchChainNodesDetailQuery } from 'modules/chains/actions/fetchChainNodesDetail';

import { useUserTotalStats } from './useUserTotalStats';
import { useChains } from './useChains';

export const useDashboard = () => {
  const {
    chains,
    error,
    isLoading,
    processedChains,
    timeframe,
    timeframeTabs,
  } = useChains();

  const { isLoading: totalStatsLoading } = useUserTotalStats();

  useChainsFetchChainNodesDetailQuery();

  return {
    error,
    isLoading,
    networksConfigurations: processedChains,
    rawChains: chains,
    timeframe,
    timeframeTabs,
    totalStatsLoading,
  };
};
