import { useState } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useChainsFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectBlockchainsLoadingStatus,
  selectPublicBlockchains,
} from 'modules/chains/store/selectors';
import { ESortChainsType } from 'modules/chains/types';

import { useTimeframe } from '../../../hooks/useTimeframe';

export const usePublicChainsData = () => {
  const { isLoggedIn, loading: isConnecting } = useAuth();

  const publicChains = useAppSelector(selectPublicBlockchains);
  const publicChainsLoading = useAppSelector(selectBlockchainsLoadingStatus);

  const [timeframe, switchStatsTimeframe] = useTimeframe();

  useChainsFetchPublicRequestsCountStatsQuery(toTimeframeMap[timeframe]);

  const [sortType, setSortType] = useState<ESortChainsType>(
    ESortChainsType.Trending,
  );

  const [searchContent, setSearchContent] = useSearch();

  return {
    isLoggedIn,
    chains: publicChains,
    loading: isConnecting || publicChainsLoading,
    searchContent,
    setSearchContent,
    setSortType,
    sortType,
    switchStatsTimeframe,
    timeframe,
  };
};
