import BigNumber from 'bignumber.js';

import { accountFetchAccountBalance } from 'domains/account/actions/balance/fetchAccountBalance';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export interface AnkrBalanceOnWallet {
  ankrBalance?: BigNumber;
  isLoading: boolean;
}

export const useAnkrBalanceOnWallet = (
  hasCredentials: boolean,
): AnkrBalanceOnWallet => {
  const [fetchBalance, { data: ankrBalance, isLoading, isUninitialized }] =
    useQueryEndpoint(accountFetchAccountBalance);

  useOnMount(() => {
    if (hasCredentials && isUninitialized) {
      fetchBalance();
    }
  });

  return { ankrBalance, isLoading };
};
