import { useQuery } from '@redux-requests/react';

import { ResponseData } from 'modules/common/types/ResponseData';

import { fetchStats } from '../actions/fetchStats';

export interface IUseFetchStatsData {
  error: Error | null;
  isLoading: boolean;
  stats: ResponseData<typeof fetchStats> | null;
}

export const useFetchStats = (): IUseFetchStatsData => {
  const {
    data: stats,
    error,
    loading: isLoading,
  } = useQuery({
    type: fetchStats,
  });

  return {
    error,
    isLoading,
    stats,
  };
};
