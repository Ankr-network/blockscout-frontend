import { useEffect, useMemo } from 'react';

import { ECurrency } from 'modules/payments/types';

import { IOneTimeAmountProps } from '../OneTimeAmount';
import { useAmount } from './useAmount';
import { useAmountChips } from '../../AmountChips';
import { useAmountInput } from '../../AmountInput';

export interface IUseOneTimeAmountProps {
  currency: ECurrency;
  handleCurrencyChange: (currency: ECurrency) => void;
  minAmount: number;
}

export const useOneTimeAmount = ({
  currency,
  handleCurrencyChange,
  minAmount,
}: IUseOneTimeAmountProps) => {
  const {
    amount,
    amounts,
    handleAmountSelectByChipClick,
    selectedAmountID,
    setAmount,
    setSelectedAmountID,
  } = useAmount({ currency });

  const { amountInputProps, isLoading, resetInputError } = useAmountInput({
    amount,
    currency,
    minAmount,
    handleSetAmount: setAmount,
    handleCurrencyChange,
  });

  const { onAmountSelect, selectedAmountID: selectedByChipAmountID } =
    useAmountChips({
      selectedAmountID,
      onAmountSelect: handleAmountSelectByChipClick,
    });

  useEffect(() => {
    resetInputError();
    setSelectedAmountID(id => selectedByChipAmountID || id);
  }, [selectedByChipAmountID, setSelectedAmountID, resetInputError]);

  const oneTimeAmountProps = useMemo<IOneTimeAmountProps>(
    () => ({
      amountInputProps,
      amounts,
      isLoading,
      onAmountSelect,
      selectedAmountID,
    }),
    [amountInputProps, amounts, isLoading, onAmountSelect, selectedAmountID],
  );

  return { oneTimeAmount: amount, oneTimeAmountProps };
};
