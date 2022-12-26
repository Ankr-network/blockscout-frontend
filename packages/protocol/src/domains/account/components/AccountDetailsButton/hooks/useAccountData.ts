import BigNumber from 'bignumber.js';

import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useBalanceEndTime } from 'domains/account/hooks/useBalanceEndTime';
import { AccountType, BalanceStatus } from 'domains/account/types';
import { getAccountType } from 'domains/account/utils/getAccountType';
import { getBalanceStatus } from 'domains/account/utils/getBalanceStatus';

export interface AccountData {
  accountType: AccountType;
  balance: BigNumber;
  isLoading?: boolean;
  status: BalanceStatus;
}

export const useAccountData = (): AccountData => {
  const { isConnecting, isNew, premiumUntil } = useAccountAuth();

  const { creditBalance: balance, isLoadingInitially: isBalanceLoading } =
    useBalance(true);

  const { endTime, isLoading: isBalanceEndTimeLoading } =
    useBalanceEndTime(true);

  const accountType = getAccountType({
    balance,
    balanceEndTime: endTime,
    isNew,
    premiumUntil,
  });
  const status = getBalanceStatus(accountType);

  const isLoading = isBalanceLoading || isConnecting || isBalanceEndTimeLoading;

  return { accountType, balance, isLoading, status };
};
