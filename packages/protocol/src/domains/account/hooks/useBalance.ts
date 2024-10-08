import { SubscriptionOptions } from '@reduxjs/toolkit/dist/query/core/apiState';
import { useEffect, useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyFetchBalanceQuery } from 'domains/account/actions/balance/fetchBalance';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
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
};
