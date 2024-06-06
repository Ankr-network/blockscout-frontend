import { useAuth } from 'domains/auth/hooks/useAuth';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useChainsFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';

import { usePublicChainsInfo } from './usePublicChainsInfo';
import { useSortType } from '../../../hooks/useSortType';
import { useTimeframe } from '../../../hooks/useTimeframe';

export const usePublicChainsData = () => {
  const { isLoggedIn, loading: isConnecting } = useAuth();

  const [publicChains, publicAllChains, publicChainsLoading] =
    usePublicChainsInfo();

  const [timeframe, switchStatsTimeframe] = useTimeframe();

  useChainsFetchPublicRequestsCountStatsQuery(toTimeframeMap[timeframe]);

  const [sortType, setSortType] = useSortType();

  const [searchContent, setSearchContent] = useSearch();

  return {
    isLoggedIn,
    chains: publicChains,
    allChains: publicAllChains,
    loading: isConnecting || publicChainsLoading,
    searchContent,
    setSearchContent,
    setSortType,
    sortType,
    switchStatsTimeframe,
    timeframe,
  };
};
