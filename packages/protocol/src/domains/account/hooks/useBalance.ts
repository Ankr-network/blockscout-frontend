// @ts-nocheck
import { SubscriptionOptions } from '@reduxjs/toolkit/dist/query/core/apiState';
import { useEffect, useMemo } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyFetchBalanceQuery } from 'domains/account/actions/balance/fetchBalance';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import {
  selectAnkrBalance,
  selectAnkrBalanceWithoutVouchers,
  selectBalanceFetching,
  selectBalanceLevel,
  selectBalanceLoading,
  selectIsBalanceUninitialized,
  selectTotalBalance,
  selectUSDBalance,
  selectVoucherBalance,
} from 'domains/account/store/selectors';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

export interface BalanceParams {
  skipFetching?: boolean;
  options?: SubscriptionOptions;
}

const defaultOptions: SubscriptionOptions = {
  pollingInterval: 30_000,
};

export const useBalance = ({
  options = defaultOptions,
  skipFetching = false,
}: BalanceParams | void = {}) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { isLoggedIn } = useAuth();
  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const shouldFetch = useMemo(
    () =>
      isLoggedIn &&
      !skipFetching &&
      !isEnterpriseClient &&
      !isEnterpriseStatusLoading,
    [isEnterpriseClient, isEnterpriseStatusLoading, isLoggedIn, skipFetching],
  );

  const [fetch] = useLazyFetchBalanceQuery(options);

  useEffect(() => {
    if (shouldFetch) {
      const { unsubscribe } = fetch({ group });

      return unsubscribe;
    }

    return () => {};
  }, [fetch, shouldFetch, group]);

  const ankrBalance = useAppSelector(selectAnkrBalance);
  const ankrBalanceWithoutVouchers = useAppSelector(
    selectAnkrBalanceWithoutVouchers,
  );
  const balanceLevel = useAppSelector(selectBalanceLevel);
  const creditBalance = useAppSelector(selectTotalBalance);
  const fetching = useAppSelector(selectBalanceFetching);
  const isUninitialized = useAppSelector(selectIsBalanceUninitialized);
  const loading = useAppSelector(selectBalanceLoading);
  const usdBalance = useAppSelector(selectUSDBalance);
  const voucherBalance = useAppSelector(selectVoucherBalance);

  return {
    ankrBalance,
    ankrBalanceWithoutVouchers,
    balanceLevel,
    creditBalance,
    fetching,
    loading,
    usdBalance,
    voucherBalance,
    isUninitialized,
  };
};
