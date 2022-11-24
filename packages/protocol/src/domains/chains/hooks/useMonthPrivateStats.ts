import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { PrivateStats } from 'multirpc-sdk';
import { useEffect } from 'react';

import { fetchMonthPrivateStats } from '../actions/fetchMonthPrivateStats';

export interface PrivateStatsParams {
  hasCredentials: boolean;
}

export const useMonthPrivateStats = ({
  hasCredentials,
}: PrivateStatsParams): [PrivateStats, boolean] => {
  const { data: stats, loading } = useQuery({
    defaultData: {},
    type: fetchMonthPrivateStats,
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (hasCredentials) {
      dispatch(fetchMonthPrivateStats());
    }
  }, [hasCredentials, dispatch]);

  return [stats, loading];
};
