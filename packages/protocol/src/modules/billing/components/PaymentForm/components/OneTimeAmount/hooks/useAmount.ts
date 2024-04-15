import { useEffect, useMemo, useState } from 'react';

import { ECurrency } from 'modules/billing/types';

import { getAmounts } from '../utils/getAmounts';
import { getAmountIDByAmountValue } from '../utils/getAmountIDByAmountValue';

export interface IUseAmountProps {
  currency: ECurrency;
}

export const useAmount = ({ currency }: IUseAmountProps) => {
  const { amounts, initialAmount, initialSelectedAmountID } = useMemo(
    () => getAmounts(currency),
    [currency],
  );

  const [amount, setAmount] = useState(initialAmount);
  const [selectedAmountID, setSelectedAmountID] = useState(
    initialSelectedAmountID,
  );

  useEffect(() => {
    const {
      initialAmount: nextAmount,
      initialSelectedAmountID: nextSelectedAmountID,
    } = getAmounts(currency);

    setAmount(nextAmount);
    setSelectedAmountID(nextSelectedAmountID);
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

  return { amount, amounts, selectedAmountID, setAmount, setSelectedAmountID };
};
