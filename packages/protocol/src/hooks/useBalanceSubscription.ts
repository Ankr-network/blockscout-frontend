import { useEffect } from 'react';

import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';

import { Options, useQueryEndpoint } from './useQueryEndpoint';

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export const useBalanceSubscription = () => {
  const { isLoggedIn } = useAuth();
  const { isDevRole } = usePermissionsAndRole();
  const [fetchBalances, , reset] = useQueryEndpoint(
    accountFetchBalance,
    options,
  );

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => {
    if (isDevRole) {
      return () => {};
    }

    if (group) {
      reset();

      const { unsubscribe } = fetchBalances({ group });

      return unsubscribe;
    }
    if (isLoggedIn) {
      const { unsubscribe } = fetchBalances({ group });

      return unsubscribe;
    }

    return reset;
  }, [fetchBalances, group, isLoggedIn, reset, isDevRole]);
};
