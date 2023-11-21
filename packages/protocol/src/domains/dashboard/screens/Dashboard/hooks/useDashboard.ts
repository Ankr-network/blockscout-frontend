import { useChainsFetchChainNodesDetailQuery } from 'modules/chains/actions/fetchChainNodesDetail';

import { useUserTotalStats } from './useUserTotalStats';
import { useChains } from './useChains';

export const useDashboard = () => {
  const {
    processedChains,
    chains,
    timeframe,
    timeframeTabs,
    allChains,
    isLoading,
    error,
  } = useChains();

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
