import { ESortChainsType } from '@ankr.com/chains-list';
import { useState } from 'react';

import { REFETCH_INTERVAL } from 'modules/common/constants/const';
import {
  selectBlockchainsLoadingStatus,
  selectPublicBlockchains,
} from 'modules/chains/store/selectors';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';

import { useTimeframe } from '../../../hooks/useTimeframe';

export const usePublicChainsData = () => {
  const { isLoggedIn, loading: isConnecting } = useAuth();

  const publicChains = useAppSelector(selectPublicBlockchains);
  const publicChainsLoading = useAppSelector(selectBlockchainsLoadingStatus);

  const [timeframe, switchStatsTimeframe] = useTimeframe();

  useFetchPublicRequestsCountStatsQuery(toTimeframeMap[timeframe], {
    refetchOnMountOrArgChange: REFETCH_INTERVAL,
  });

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
