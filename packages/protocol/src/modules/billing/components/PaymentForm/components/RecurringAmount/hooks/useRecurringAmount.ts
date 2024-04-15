import { useMemo } from 'react';

import { IAmount } from 'modules/billing/types';
import {
  selectDefaultUSDSubscriptionAmountID,
  selectUSDSubscriptionAmounts,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useUSDSubscriptionPrices } from 'domains/account/hooks/useUSDSubscriptionPrices';

import { IRecurringAmountProps } from '../RecurringAmount';
import { useAmountChips } from '../../AmountChips';

export interface IUseRecurringAmountResult extends IRecurringAmountProps {
  amount?: IAmount;
}

export const useRecurringAmount = (): IUseRecurringAmountResult => {
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

  return { amount, amounts, isLoading, onAmountSelect, selectedAmountID };
};
