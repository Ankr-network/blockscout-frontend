import { useMemo } from 'react';

import {
  selectDefaultUSDSubscriptionAmountID,
  selectUSDSubscriptionAmounts,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useUSDSubscriptionPrices } from 'domains/account/hooks/useUSDSubscriptionPrices';

import { IRecurringAmountProps } from '../RecurringAmount';
import { useAmountChips } from '../../AmountChips';

export const useRecurringAmount = () => {
  const { isLoading } = useUSDSubscriptionPrices();

  const amounts = useAppSelector(selectUSDSubscriptionAmounts);
  const selectedByDefaultAmountID = useAppSelector(
    selectDefaultUSDSubscriptionAmountID,
  );

  const { onAmountSelect, selectedAmountID } = useAmountChips({
    selectedAmountID: selectedByDefaultAmountID,
  });

  const amount = useMemo(
    () => amounts.find(({ id }) => id === selectedAmountID),
    [amounts, selectedAmountID],
  );

  const recurringAmountProps = useMemo<IRecurringAmountProps>(
    () => ({
      amounts,
      isLoading,
      onAmountSelect,
      selectedAmountID,
    }),
    [amounts, isLoading, onAmountSelect, selectedAmountID],
  );

  return { recurringAmount: amount, recurringAmountProps };
};
