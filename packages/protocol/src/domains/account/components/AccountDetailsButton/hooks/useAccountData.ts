import BigNumber from 'bignumber.js';

import { AccountStatus } from 'multirpc-sdk';
import { useAccountStatus } from 'domains/account/hooks/useAccountStatus';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useBalances } from 'domains/account/hooks/useBalances';

export interface AccountData {
  balance: BigNumber;
  isLoading?: boolean;
  isVisible?: boolean;
  status: AccountStatus;
}

export const useAccountData = (): AccountData => {
  const { account, isConnected } = useAuth();
  const { ankrBalance: balance, isLoading: areBalancesLoading } =
    useBalances(isConnected);
  const [status, isStatusLoading] = useAccountStatus({ account, isConnected });

  const isLoading = areBalancesLoading || isStatusLoading;

  return { status, balance, isLoading, isVisible: isConnected };
};
