import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useRef, useState } from 'react';

import { getAccountType } from 'domains/account/utils/getAccountType';
import { useBalanceEndTime } from 'domains/account/hooks/useBalanceEndTime';

export const useAccountType = (
  ankrBalance: BigNumber,
  isNew: boolean,
  premiumUntil?: Date,
  isConnected = false,
) => {
  const currentAnkrBalance = useRef(ankrBalance);
  const isBalanceChanged = useMemo(
    () => !ankrBalance.isEqualTo(currentAnkrBalance.current),
    [ankrBalance],
  );

  const { endTime: balanceEndTime } = useBalanceEndTime(
    isConnected,
    isBalanceChanged,
  );

  const [currentAccountType, setCurrentAccountType] = useState(
    getAccountType({
      balance: ankrBalance,
      balanceEndTime,
      isNew,
      premiumUntil,
    }),
  );

  useEffect(() => {
    if (isBalanceChanged) {
      const accountType = getAccountType({
        balance: ankrBalance,
        balanceEndTime,
        isNew,
        premiumUntil,
      });

      if (accountType !== currentAccountType) {
        setCurrentAccountType(accountType);
        currentAnkrBalance.current = ankrBalance;
      }
    }
  }, [
    ankrBalance,
    isBalanceChanged,
    balanceEndTime,
    currentAccountType,
    isNew,
    premiumUntil,
  ]);

  return {
    accountType: currentAccountType,
  };
};
