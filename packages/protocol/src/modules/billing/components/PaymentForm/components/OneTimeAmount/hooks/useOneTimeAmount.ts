import { useEffect } from 'react';

import { ECurrency } from 'modules/billing/types';

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
  const {
    amount,
    amounts,
    selectedAmountID,
    setAmount,
    setSelectedAmountID,
    handleAmountSelectByChipClick,
  } = useAmount({ currency });

  const { isLoading, ...amountInputProps } = useAmountInput({
    amount,
    currency,
    minAmount,
    handleSetAmount: setAmount,
    handleChangeCurrency,
  });

  const { resetInputError } = amountInputProps;

  const { onAmountSelect, selectedAmountID: selectedByChipAmountID } =
    useAmountChips({
      selectedAmountID,
      onAmountSelect: handleAmountSelectByChipClick,
    });

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
