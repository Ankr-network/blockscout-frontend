import BigNumber from 'bignumber.js';

import { AccountType, BalanceStatus } from 'domains/account/types';
import { getBalanceStatus } from 'domains/account/utils/getBalanceStatus';
import { getAccountType } from 'domains/account/utils/getAccountType';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useBalanceEndTime } from 'domains/account/hooks/useBalanceEndTime';
import { useAppSelector } from 'store/useAppSelector';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { useMemo } from 'react';

export interface AccountData {
  accountType: AccountType;
  balance: BigNumber;
  isLoading?: boolean;
  isVisible?: boolean;
  status: BalanceStatus;
}

export const useAccountData = (): AccountData => {
  const {
    isConnected: isWallectConnected,
    isConnecting,
    isNew,
    premiumUntil,
  } = useAuth();
  const cachedAuthData = useAppSelector(selectAuthData);

  const isConnected = useMemo(
    () => isWallectConnected && !cachedAuthData.isManualDisconnected,
    [isWallectConnected, cachedAuthData.isManualDisconnected],
  );

  const { ankrBalance: balance, isLoadingInitially: isBalanceLoading } =
    useBalance(isConnected);

  const { endTime, isLoading: isBalanceEndTimeLoading } =
    useBalanceEndTime(isConnected);

  const accountType = getAccountType({
    balance,
    balanceEndTime: endTime,
    isNew,
    premiumUntil,
  });
  const status = getBalanceStatus(accountType);

  const isLoading = isBalanceLoading || isConnecting || isBalanceEndTimeLoading;

  return { accountType, balance, isLoading, isVisible: isConnected, status };
};
