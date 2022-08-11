import { useState, useEffect, useRef, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useBalanceEndTime } from 'domains/account/hooks/useBalanceEndTime';
import { getAccountType } from 'domains/account/utils/getAccountType';

export const useAccountType = (
  ankrBalance: BigNumber,
  isNew: boolean,
  premiumUntil?: Date,
) => {
  const currentAnkrBalance = useRef(ankrBalance);
  const isBalanceChanged = useMemo(
    () => !ankrBalance.isEqualTo(currentAnkrBalance.current),
    [ankrBalance],
  );

  const { endTime: balanceEndTime } = useBalanceEndTime(true, isBalanceChanged);

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
