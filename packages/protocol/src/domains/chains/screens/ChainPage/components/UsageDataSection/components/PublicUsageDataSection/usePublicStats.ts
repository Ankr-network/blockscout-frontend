import BigNumber from 'bignumber.js';
import { Timeframe } from '@ankr.com/chains-list';

import { IUseQueryProps } from 'store/queries/types';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { timeframeToStatsTimeframe } from 'domains/chains/constants/timeframeToStatsTimeframeMap';
import { useFetchChainTimeframeDataQuery } from 'domains/chains/actions/public/fetchChainTimeframeData';

import { PublicStats } from '../../types';
import { normalizeTotalRequestsHistory } from '../../utils/normalizeTotalRequestsHistory';

export interface PublicStatsParams extends IUseQueryProps {
  chainId: string;
  timeframe: Timeframe;
}

const defaultData = {
  totalCached: new BigNumber(0),
  totalRequests: new BigNumber(0),
  totalRequestsHistory: {},
  countries: {},
};

export const usePublicStats = ({
  chainId,
  skipFetching,
  timeframe,
}: PublicStatsParams): PublicStats => {
  const {
    data: {
      countries,
      totalCached,
      totalRequests,
      totalRequestsHistory,
    } = defaultData,
    error,
    isFetching,
    isLoading,
    isUninitialized,
  } = useFetchChainTimeframeDataQuery(
    {
      chainId,
      timeframe: timeframeToStatsTimeframe[timeframe],
    },
    {
      refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
      skip: skipFetching || !chainId,
    },
  );

  return {
    countries,
    error,
    isLoading: isLoading || isFetching,
    isUninitialized,
    totalCached,
    totalRequests,
    totalRequestsHistory: normalizeTotalRequestsHistory(totalRequestsHistory),
  };
};
