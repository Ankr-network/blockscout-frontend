import { useCallback, useEffect } from 'react';

import { ECurrency, IAmount } from 'modules/billing/types';

import { IOneTimeAmountProps } from '../OneTimeAmount';
import { useAmount } from './useAmount';
import { useAmountChips } from '../../AmountChips';
import { useAmountInput } from '../../AmountInput';

export interface IUseOneTimeAmountProps {
  currency: ECurrency;
}

export interface IUseOneTimeAmountResult extends IOneTimeAmountProps {
  amount: number;
}

export const useOneTimeAmount = ({
  currency,
}: IUseOneTimeAmountProps): IUseOneTimeAmountResult => {
  const { amount, amounts, selectedAmountID, setAmount, setSelectedAmountID } =
    useAmount({ currency });

  const handleAmountSelect = useCallback(
    ({ id, value }: IAmount) => {
      setAmount(value);
      setSelectedAmountID(id);
    },
    [setAmount, setSelectedAmountID],
  );

  const { onAmountSelect, selectedAmountID: selectedByChipAmountID } =
    useAmountChips({
      selectedAmountID,
      onAmountSelect: handleAmountSelect,
    });

  const { isLoading, ...amountInputProps } = useAmountInput({
    amount,
    currency,
    handleSetAmount: setAmount,
  });

  useEffect(
    () => setSelectedAmountID(id => selectedByChipAmountID ?? id),
    [selectedByChipAmountID, setSelectedAmountID],
  );

  return {
    amount,
    amountInputProps,
    amounts,
    isLoading,
    onAmountSelect,
    selectedAmountID,
  };
};
