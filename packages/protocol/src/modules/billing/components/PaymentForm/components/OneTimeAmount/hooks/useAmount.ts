import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ECurrency, IAmount } from 'modules/billing/types';
import { isStableCoinCurrency } from 'modules/billing/utils/isStableCoinCurrency';

import { getAmounts } from '../utils/getAmounts';
import { getAmountIDByAmountValue } from '../utils/getAmountIDByAmountValue';

export interface IUseAmountProps {
  currency: ECurrency;
}

export const useAmount = ({ currency }: IUseAmountProps) => {
  const cachedCurrencyRef = useRef(currency);

  const { amounts, initialAmount, initialSelectedAmountID } = useMemo(
    () => getAmounts(currency),
    [currency],
  );

  const [amount, setAmount] = useState(initialAmount);
  const [selectedAmountID, setSelectedAmountID] = useState(
    initialSelectedAmountID,
  );

  useEffect(() => {
    const isSwitchedBetweenStableCoins =
      isStableCoinCurrency(cachedCurrencyRef.current) &&
      isStableCoinCurrency(currency);

    // on switch between stablecoins we should keep the same amount
    // (https://ankrnetwork.atlassian.net/browse/MRPC-4815)
    if (!isSwitchedBetweenStableCoins) {
      const {
        initialAmount: nextAmount,
        initialSelectedAmountID: nextSelectedAmountID,
      } = getAmounts(currency);

      setAmount(nextAmount);
      setSelectedAmountID(nextSelectedAmountID);
    }

    cachedCurrencyRef.current = currency;
  }, [currency]);

  useEffect(
    () => {
      const nextSelectedAmountID = getAmountIDByAmountValue({
        amount,
        amounts,
      });

      setSelectedAmountID(nextSelectedAmountID);
    },
    // we should track amount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [amount],
  );

  const handleAmountSelectByChipClick = useCallback(
    ({ id, value }: IAmount) => {
      setAmount(value);
      setSelectedAmountID(id);
    },
    [setAmount, setSelectedAmountID],
  );

  return {
    amount,
    amounts,
    selectedAmountID,
    setAmount,
    setSelectedAmountID,
    resetSelectedAmountID: () => setSelectedAmountID(undefined),
    handleAmountSelectByChipClick,
  };
};
