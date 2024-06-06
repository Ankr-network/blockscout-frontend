import { useChainsFetchChainNodesDetailQuery } from 'modules/chains/actions/fetchChainNodesDetail';

import { useUserTotalStats } from './useUserTotalStats';
import { useChains } from './useChains';

export const useDashboard = () => {
  const {
    allChains,
    chains,
    error,
    isLoading,
    processedChains,
    timeframe,
    timeframeTabs,
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
