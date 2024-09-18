import { useMemo } from 'react';

import {
  selectBundlePaymentPlansInitLoading,
  selectDealAmounts,
  selectMyBundlesInitLoading,
  selectMyCurrentBundle,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAmountChips } from 'modules/payments/components/PaymentForm/components/AmountChips';
import { MINIMAL_DEAL_AMOUNT } from 'modules/payments/const';

export const useDealAmounts = () => {
  const isLoadingInitiallyPlans = useAppSelector(
    selectBundlePaymentPlansInitLoading,
  );

  const isLoadingInitiallyBundles = useAppSelector(selectMyBundlesInitLoading);

  const isLoadingInitially =
    isLoadingInitiallyPlans || isLoadingInitiallyBundles;

  const amounts = useAppSelector(selectDealAmounts);
  const currentPlan = useAppSelector(selectMyCurrentBundle);
  const { amount: currentPlanAmount = 0 } = currentPlan || {};

  const defaultAmount = useMemo(() => {
    let nextDealPriceIndex =
      amounts.findIndex(amount => +amount.value === +currentPlanAmount) + 1;

    if (+currentPlanAmount <= 0) {
      nextDealPriceIndex = amounts.findIndex(
        ({ value }) => value >= MINIMAL_DEAL_AMOUNT,
      );
    }

    if (nextDealPriceIndex >= amounts.length) {
      nextDealPriceIndex -= 1;
    }

    return amounts[nextDealPriceIndex];
    // should be updated only after initial loading, so other deps are removed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingInitially]);

  const { onAmountSelect, selectedAmountID } = useAmountChips({
    selectedAmountID: defaultAmount?.id,
  });

  const amount = useMemo(
    () => amounts.find(({ id }) => id === selectedAmountID),
    [amounts, selectedAmountID],
  );

  return {
    amounts,
    amount,
    onAmountSelect,
    selectedAmountID,
    isLoading: isLoadingInitiallyPlans,
  };
};
