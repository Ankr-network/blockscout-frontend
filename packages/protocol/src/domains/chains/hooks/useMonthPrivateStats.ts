import { PrivateStats } from 'multirpc-sdk';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { fetchMonthPrivateStats } from '../actions/fetchMonthPrivateStats';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export interface PrivateStatsParams {
  isWalletConnected: boolean;
  poll?: number;
  requestKey?: string;
}

export const useMonthPrivateStats = ({
  isWalletConnected,
  requestKey,
}: PrivateStatsParams): [PrivateStats, boolean] => {
  const { data: stats, loading } = useQuery({
    defaultData: {},
    type: fetchMonthPrivateStats,
    requestKey,
  });

  const dispatch = useDispatchRequest();

  useOnMount(() => {
    if (isWalletConnected) {
      dispatch(fetchMonthPrivateStats(requestKey));
    }
  });

  return [stats, loading];
};
