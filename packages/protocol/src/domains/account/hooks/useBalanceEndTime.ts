import { useEffect } from 'react';

import { Trigger, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { accountFetchBalanceEndTime } from '../actions/fetchBalanceEndTime';
import { fetchPremiumStatus } from 'domains/auth/actions/fetchPremiumStatus';
import { useAppSelector } from 'store/useAppSelector';
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';

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
  const { isDevRole } = usePermissionsAndRole();

  const [
    fetchBalanceEndTime,
    { data: endTime = -1, isLoading, isUninitialized },
  ] = useQueryEndpoint(accountFetchBalanceEndTime);

  useEffect(() => {
    fetch(isConnected && isUninitialized && !isDevRole, fetchBalanceEndTime);
  }, [fetchBalanceEndTime, isConnected, isUninitialized, isDevRole]);

  useEffect(() => {
    fetch(Boolean(needRequery && !isDevRole), fetchBalanceEndTime);
  }, [fetchBalanceEndTime, needRequery, isDevRole]);

  useEffect(() => {
    fetch(isConnected && !isDevRole, fetchBalanceEndTime);
  }, [fetchBalanceEndTime, isConnected, status, isDevRole]);

  return { endTime, isLoading };
};
