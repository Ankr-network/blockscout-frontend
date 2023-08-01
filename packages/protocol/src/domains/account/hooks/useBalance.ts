import { SubscriptionOptions } from '@reduxjs/toolkit/dist/query/core/apiState';
import { useEffect } from 'react';

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
  selectTotalBalance,
  selectUSDBalance,
  selectVoucherBalance,
} from '../store/selectors';

export interface BalanceParams {
  skipFetching?: boolean;
}

const options: SubscriptionOptions = {
  pollingInterval: 30_000,
};

export const useBalance = ({
  skipFetching = false,
}: BalanceParams | void = {}) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { isLoggedIn } = useAuth();

  const shouldFetch = isLoggedIn && !skipFetching;

  const [fetch] = useLazyFetchBalanceQuery(options);

  useEffect(() => {
    if (shouldFetch) {
      const { unsubscribe } = fetch({ group });

      return unsubscribe;
    }

    return () => {};
  }, [fetch, group, shouldFetch]);

  const ankrBalance = useAppSelector(selectAnkrBalance);
  const ankrBalanceWithoutVouchers = useAppSelector(
    selectAnkrBalanceWithoutVouchers,
  );
  const balanceLevel = useAppSelector(selectBalanceLevel);
  const creditBalance = useAppSelector(selectTotalBalance);
  const fetching = useAppSelector(selectBalanceFetching);
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
  };
};
