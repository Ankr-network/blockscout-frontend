import { useAuth } from 'domains/auth/hooks/useAuth';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { usePublicRequestsCountStats } from 'domains/chains/hooks/usePublicRequestsCountStats';
import { usePublicChains } from './usePublicChains';
import { useSortType } from '../../hooks/useSortType';
import { useTimeframe } from '../../hooks/useTimeframe';

export const usePublicChainsData = () => {
  const { loading: isConnecting } = useAuth();

  const [publicChains, publicAllChains, publicChainsLoading] =
    usePublicChains();

  const [timeframe, switchStatsTimeframe] = useTimeframe();

  usePublicRequestsCountStats({
    interval: toTimeframeMap[timeframe],
  });

  const [sortType, setSortType] = useSortType();

  return {
    chains: publicChains,
    allChains: publicAllChains,
    loading: isConnecting || publicChainsLoading,
    setSortType,
    sortType,
    switchStatsTimeframe,
    timeframe,
  };
};
