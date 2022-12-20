import { useEffect } from 'react';

import { Balance as AccountBalance } from 'domains/account/actions/balance/types';
import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { defaultBalance } from 'domains/account/actions/balance/const';

export interface Balance extends AccountBalance {
  isLoading: boolean;
  isLoadingInitially: boolean;
}

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export const useBalance = (hasCredentials?: boolean): Balance => {
  const [fetchBalance, { data: balances, isLoading }] = useQueryEndpoint(
    accountFetchBalance,
    options,
  );

  const isLoadingInitially = !balances && isLoading;

  useEffect(() => {
    if (hasCredentials) {
      const { unsubscribe } = fetchBalance();

      return unsubscribe;
    }

    return () => {};
  }, [fetchBalance, hasCredentials]);

  return { ...(balances || defaultBalance), isLoading, isLoadingInitially };
};
