import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useIsMDDown } from 'uiKit/Theme/useTheme';
import { SortType } from 'domains/chains/types';
import { proccessTestnetOnlyChains } from 'domains/mmChains/screens/Chains/utils/processTestnetOnlyChains';
import { useChainsFetchChainNodesDetailQuery } from 'domains/chains/actions/fetchChainNodesDetail';
import { useFetchUserTotalStatsQuery } from 'domains/dashboard/actions/fetchUserTotalStats';
import { usePrivateChains } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChains';
import { usePrivateChainsData } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChainsData';
import { INDEX_PATH } from 'domains/chains/routes';
import { IS_DASHBOARD_HIDDEN_ON_MOBILE } from '../const';

export const useDashboard = () => {
  const history = useHistory();
  const isDashboardHidden = Boolean(
    useIsMDDown() && IS_DASHBOARD_HIDDEN_ON_MOBILE,
  );

  useEffect(() => {
    if (isDashboardHidden) {
      history.replace(INDEX_PATH);
    }
  }, [isDashboardHidden, history]);

  const { chains, allChains, timeframe, timeframeTabs, isLoading, error } =
    usePrivateChainsData();

  const { processedChains } = usePrivateChains({
    allChains,
    chains: proccessTestnetOnlyChains(chains),
    sortType: SortType.Name,
    searchContent: '',
    includeMultichain: true,
  });

  useFetchUserTotalStatsQuery();
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
