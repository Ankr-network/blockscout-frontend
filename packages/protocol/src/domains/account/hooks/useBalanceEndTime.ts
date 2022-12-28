import { useEffect } from 'react';

import { Trigger, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { accountFetchBalanceEndTime } from '../actions/fetchBalanceEndTime';

export interface BalanceEndTime {
  endTime: number;
  isLoading: boolean;
}

type Fetcher = Trigger<string[] | undefined, number>;

const fetch = (shouldFetch: boolean, fetcher: Fetcher) => {
  if (shouldFetch) {
    fetcher(undefined);
  }
};

export const useBalanceEndTime = (
  isConnected: boolean,
  needRequery?: boolean,
): BalanceEndTime => {
  const [
    fetchBalanceEndTime,
    { data: endTime = -1, isLoading, isUninitialized },
  ] = useQueryEndpoint(accountFetchBalanceEndTime);

  useEffect(() => {
    fetch(isConnected && isUninitialized, fetchBalanceEndTime);
  }, [fetchBalanceEndTime, isConnected, isUninitialized]);

  useEffect(() => {
    fetch(Boolean(needRequery), fetchBalanceEndTime);
  }, [fetchBalanceEndTime, needRequery]);

  return { endTime, isLoading };
};
