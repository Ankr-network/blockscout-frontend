import { useCallback, useEffect, useMemo } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyFetchChainsStatsForLast1hQuery } from 'domains/chains/actions/private/fetchChainsStatsForLast1h';
import { useLazyFetchChainsStatsForLastTwoHoursQuery } from 'domains/chains/actions/private/fetchChainsStatsForLast2h';
import { useLazyFetchChainStatsForLast24hQuery } from 'domains/chains/actions/private/fetchChainsStatsForLast24h';
import { useLazyFetchChainStatsForLastTwoDaysQuery } from 'domains/chains/actions/private/fetchChainStatsForLast2d';

/*
 * use this initializer for instant data loading for total requests widget */

export const useChainsStatsInitializer = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const statsParams = useMemo(() => {
    return { group };
  }, [group]);

  const [
    fetchLastTwoDaysStats,
    { data: dataTwoDaysStats, isUninitialized: isUninitializedTwoDaysStats },
  ] = useLazyFetchChainStatsForLastTwoDaysQuery();
  const [
    fetchLastDayStats,
    { data: dataDayStats, isUninitialized: isUninitializedDayStats },
  ] = useLazyFetchChainStatsForLast24hQuery();
  const [
    fetchLast1hStats,
    { data: data1hStats, isUninitialized: isUninitialized1hStats },
  ] = useLazyFetchChainsStatsForLast1hQuery();
  const [
    fetchLast2hStats,
    { data: data2hStats, isUninitialized: isUninitialized2hStats },
  ] = useLazyFetchChainsStatsForLastTwoHoursQuery();

  const initializeStats = useCallback(() => {
    fetchLastTwoDaysStats(statsParams);
    fetchLastDayStats(statsParams);
    fetchLast1hStats(statsParams);
    fetchLast2hStats(statsParams);
  }, [
    fetchLast1hStats,
    fetchLast2hStats,
    fetchLastDayStats,
    fetchLastTwoDaysStats,
    statsParams,
  ]);

  const isInitialized = useMemo(() => {
    const isDataAvailable =
      dataTwoDaysStats && dataDayStats && data1hStats && data2hStats;

    const isUninitialized =
      isUninitializedTwoDaysStats ||
      isUninitializedDayStats ||
      isUninitialized1hStats ||
      isUninitialized2hStats;

    return isDataAvailable && !isUninitialized;
  }, [
    data1hStats,
    data2hStats,
    dataDayStats,
    dataTwoDaysStats,
    isUninitialized1hStats,
    isUninitialized2hStats,
    isUninitializedDayStats,
    isUninitializedTwoDaysStats,
  ]);

  useEffect(() => {
    if (!isInitialized) {
      initializeStats();
    }
  }, [initializeStats, isInitialized]);
};
