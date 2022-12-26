import BigNumber from 'bignumber.js';

import { accountFetchAccountBalance } from 'domains/account/actions/balance/fetchAccountBalance';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export interface AnkrBalanceOnWallet {
  ankrBalance?: BigNumber;
  isLoading: boolean;
}

export const useAnkrBalanceOnWallet = (
  hasWeb3Connection?: boolean,
): AnkrBalanceOnWallet => {
  const [fetchBalance, { data: ankrBalance, isLoading }] = useQueryEndpoint(
    accountFetchAccountBalance,
  );

  useOnMount(() => {
    if (hasWeb3Connection) {
      fetchBalance();
    }
  });

  return { ankrBalance, isLoading };
};
