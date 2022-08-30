import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { PrivateStats } from 'multirpc-sdk';
import { useEffect } from 'react';

import { fetchMonthPrivateStats } from '../actions/fetchMonthPrivateStats';

export interface PrivateStatsParams {
  isWalletConnected: boolean;
}

export const useMonthPrivateStats = ({
  isWalletConnected,
}: PrivateStatsParams): [PrivateStats, boolean] => {
  const { data: stats, loading } = useQuery({
    defaultData: {},
    type: fetchMonthPrivateStats,
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isWalletConnected) {
      dispatch(fetchMonthPrivateStats());
    }
  }, [isWalletConnected, dispatch]);

  return [stats, loading];
};
