import { useEffect } from 'react';

import { Trigger, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import {
  accountFetchBalanceEndTime,
  IRequestBalanceEndTimeParams,
} from '../actions/fetchBalanceEndTime';
import { fetchPremiumStatus } from 'domains/auth/actions/fetchPremiumStatus';
import { useAppSelector } from 'store/useAppSelector';
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export interface BalanceEndTime {
  endTime: number;
  isLoading: boolean;
}

type Fetcher = Trigger<IRequestBalanceEndTimeParams, number>;

const fetch = (
  shouldFetch: boolean,
  fetcher: Fetcher,
  params: IRequestBalanceEndTimeParams,
) => {
  if (shouldFetch) {
    fetcher(params);
  }
};

export const useBalanceEndTime = (
  isConnected: boolean,
  needRequery?: boolean,
): BalanceEndTime => {
  const { data: status } = useAppSelector(fetchPremiumStatus.select(''));
  const { isDevRole } = usePermissionsAndRole();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [
    fetchBalanceEndTime,
    { data: endTime = -1, isLoading, isUninitialized },
  ] = useQueryEndpoint(accountFetchBalanceEndTime);

  useEffect(() => {
    fetch(isConnected && isUninitialized && !isDevRole, fetchBalanceEndTime, {
      group,
    });
  }, [fetchBalanceEndTime, isConnected, isUninitialized, isDevRole, group]);

  useEffect(() => {
    fetch(Boolean(needRequery && !isDevRole), fetchBalanceEndTime, { group });
  }, [fetchBalanceEndTime, needRequery, isDevRole, group]);

  useEffect(() => {
    fetch(isConnected && !isDevRole, fetchBalanceEndTime, { group });
  }, [fetchBalanceEndTime, isConnected, status, isDevRole, group]);

  return { endTime, isLoading };
};
