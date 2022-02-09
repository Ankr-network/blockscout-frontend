import { useQuery } from '@redux-requests/react';
import { ResponseData } from 'modules/common/types/ResponseData';
import { fetchStats } from '../actions/fetchStats';

interface IUseFetchStatsData {
  error: Error | null;
  isLoading: boolean;
  stats: ResponseData<typeof fetchStats> | null;
}

export const useFetchStats = (): IUseFetchStatsData => {
  const {
    data: stats,
    error,
    loading: isLoading,
  } = useQuery<ResponseData<typeof fetchStats>>({
    action: fetchStats,
    defaultData: null,
    type: fetchStats,
  });

  return {
    error,
    isLoading,
    stats,
  };
};
