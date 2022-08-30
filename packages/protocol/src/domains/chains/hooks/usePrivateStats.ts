import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchPrivateStats } from 'domains/chains/actions/fetchPrivateStats';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

export interface PrivateStatsParams {
  interval: PrivateStatsInterval;
  isWalletConnected: boolean;
  requestKey?: string;
}

export interface PrivateStatsReturn {
  data: PrivateStats;
  arePrivateStatsLoading: boolean;
  privateStatsError: any;
}

export const usePrivateStats = ({
  interval,
  isWalletConnected,
  requestKey,
}: PrivateStatsParams): PrivateStatsReturn => {
  const {
    data,
    loading: arePrivateStatsLoading,
    error: privateStatsError,
  } = useQuery({
    defaultData: {},
    type: fetchPrivateStats,
    requestKey,
  });

  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetRequests([fetchPrivateStats.toString()]));
  });

  useEffect(() => {
    if (isWalletConnected) {
      dispatchRequest(fetchPrivateStats(interval, requestKey));
    }
  }, [dispatch, dispatchRequest, isWalletConnected, interval, requestKey]);

  return {
    data,
    arePrivateStatsLoading,
    privateStatsError,
  };
};
