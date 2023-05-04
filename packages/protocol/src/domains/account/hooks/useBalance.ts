import { useEffect } from 'react';

import { Balance as AccountBalance } from 'domains/account/actions/balance/types';
import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { defaultBalance } from 'domains/account/actions/balance/const';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export interface Balance extends AccountBalance {
  isLoading: boolean;
  isLoadingInitially: boolean;
}

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export const useBalance = (): Balance => {
  const { isLoggedIn } = useAuth();

  const [fetchBalance, { data: balances, isLoading }] = useQueryEndpoint(
    accountFetchBalance,
    options,
  );

  const isLoadingInitially = !balances && isLoading;

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => {
    if (isLoggedIn) {
      const { unsubscribe } = fetchBalance({ group });

      return unsubscribe;
    }

    return () => {};
  }, [fetchBalance, isLoggedIn, group]);

  return {
    ...(balances || defaultBalance),
    isLoading,
    isLoadingInitially,
  };
};
