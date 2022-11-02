import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { ChainID } from 'modules/chains/types';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { Timeframe } from 'multirpc-sdk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPublicRequestsCountStats } from '../actions/fetchPublicRequestsCountStats';

export interface PublicStatsParams {
  interval: Timeframe;
  isWalletConnected: boolean;
  requestKey?: string;
}

export interface PublicStatsReturn {
  data: Record<ChainID, string>;
  arePublicStatsLoading: boolean;
  publicStatsError: any;
}

export const usePublicRequestsCountStats = ({
  interval,
  isWalletConnected,
}: PublicStatsParams): PublicStatsReturn => {
  const {
    data,
    loading: arePublicStatsLoading,
    error: publicStatsError,
  } = useQuery({
    defaultData: {},
    type: fetchPublicRequestsCountStats,
  });

  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetRequests([fetchPublicRequestsCountStats.toString()]));
  });

  useEffect(() => {
    if (!isWalletConnected) {
      dispatchRequest(fetchPublicRequestsCountStats(interval));
    }
  }, [dispatch, dispatchRequest, isWalletConnected, interval]);

  return {
    data,
    arePublicStatsLoading,
    publicStatsError,
  };
};
