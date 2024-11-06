import { useChainsFetchChainNodesDetailQuery } from 'modules/chains/actions/fetchChainNodesDetail';
import { usePrivateTotalStats } from 'modules/stats/hooks/usePrivateTotalStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

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

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { loading: totalStatsLoading } = usePrivateTotalStats({ group });

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
