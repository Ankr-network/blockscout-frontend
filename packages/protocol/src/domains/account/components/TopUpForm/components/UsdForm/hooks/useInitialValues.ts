import { useMemo } from 'react';

import { DEFAULT_USD_VALUE_STRING } from 'domains/account/actions/usdTopUp/const';
import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { selectBundlePaymentPlanByPriceId } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { FormField } from '../constants';

export interface InitialValuesParams {
  priceId?: string;
  shouldUseDefaultValue?: boolean;
}

export const useInitialValues = ({
  priceId,
  shouldUseDefaultValue = false,
}: InitialValuesParams) => {
  const bundle = useAppSelector(state =>
    selectBundlePaymentPlanByPriceId(state, priceId),
  );

  const bundleAmount = bundle?.price.amount ?? '';

  return useMemo(() => {
    if (priceId) {
      return {
        [FormField.Amount]: bundleAmount,
        [FormField.PriceId]: priceId,
      };
    }

    return {
      [FormField.Amount]: shouldUseDefaultValue
        ? DEFAULT_USD_VALUE_STRING
        : '',
      [FormField.PriceId]: ONE_TIME_PAYMENT_ID,
    };
  }, [bundleAmount, shouldUseDefaultValue, priceId]);
};
