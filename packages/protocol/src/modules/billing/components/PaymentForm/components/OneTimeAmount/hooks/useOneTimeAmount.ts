import { useCallback, useEffect } from 'react';

import { ECurrency, IAmount } from 'modules/billing/types';

import { IOneTimeAmountProps } from '../OneTimeAmount';
import { useAmount } from './useAmount';
import { useAmountChips } from '../../AmountChips';
import { useAmountInput } from '../../AmountInput';

export interface IUseOneTimeAmountProps {
  currency: ECurrency;
  minAmount: number;
  handleChangeCurrency: (currency: ECurrency) => void;
}

export interface IUseOneTimeAmountResult extends IOneTimeAmountProps {
  amount: number;
  handleChangeCurrency: (currency: ECurrency) => void;
}

export const useOneTimeAmount = ({
  currency,
  minAmount,
  handleChangeCurrency,
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
    minAmount,
    handleSetAmount: setAmount,
    handleChangeCurrency,
  });

  const { resetInputError } = amountInputProps;

  useEffect(() => {
    resetInputError();
    setSelectedAmountID(id => selectedByChipAmountID ?? id);
  }, [selectedByChipAmountID, setSelectedAmountID, resetInputError]);

  return {
    amount,
    amountInputProps,
    amounts,
    isLoading,
    onAmountSelect,
    handleChangeCurrency,
    selectedAmountID,
  };
};
