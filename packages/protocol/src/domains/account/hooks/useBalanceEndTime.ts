import { useEffect } from 'react';

import { Trigger, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { accountFetchBalanceEndTime } from '../actions/fetchBalanceEndTime';
import { fetchPremiumStatus } from 'domains/auth/actions/fetchPremiumStatus';
import { useAppSelector } from 'store/useAppSelector';

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
  const { data: status } = useAppSelector(fetchPremiumStatus.select(''));

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

  useEffect(() => {
    fetch(isConnected, fetchBalanceEndTime);
  }, [fetchBalanceEndTime, isConnected, status]);

  return { endTime, isLoading };
};
