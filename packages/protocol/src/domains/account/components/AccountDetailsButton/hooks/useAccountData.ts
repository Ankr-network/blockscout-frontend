import BigNumber from 'bignumber.js';

import { AccountStatus } from 'multirpc-sdk';
import { useAccountStatus } from 'domains/account/hooks/useAccountStatus';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';

export interface AccountData {
  balance: BigNumber;
  isLoading?: boolean;
  isVisible?: boolean;
  status: AccountStatus;
}

export const useAccountData = (): AccountData => {
  const { account, isConnected } = useAuth();
  const { ankrBalance: balance, isLoading: isBalanceLoading } =
    useBalance(isConnected);
  const [status, isStatusLoading] = useAccountStatus({ account, isConnected });

  const isLoading = isBalanceLoading || isStatusLoading;

  return { status, balance, isLoading, isVisible: isConnected };
};
