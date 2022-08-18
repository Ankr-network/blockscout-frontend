import { useQuery } from '@redux-requests/react';

import {
  getStats,
  IGetStatsData,
} from 'modules/stake-matic/polygon/actions/getStats';

interface IUseStakeFormData {
  getStatsData: IGetStatsData | null;
  getStatsError?: Error;
  isGetStatsLoading: boolean;
}

export const useStakeForm = (): IUseStakeFormData => {
  const {
    data: getStatsData,
    error: getStatsError,
    loading: isGetStatsLoading,
  } = useQuery({
    type: getStats,
  });

  return {
    getStatsData,
    getStatsError,
    isGetStatsLoading,
  };
};
