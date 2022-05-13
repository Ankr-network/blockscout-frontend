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
  const { isConnected, isConnecting } = useAuth();

  const { ankrBalance: balance, isLoading: isBalanceLoading } =
    useBalance(isConnected);

  const status = useAccountStatus({ balance });

  const isLoading = isBalanceLoading || isConnecting;

  return { status, balance, isLoading, isVisible: isConnected };
};
