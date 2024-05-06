import { useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';
import { useAppSelector } from 'store/useAppSelector';
import { selectPaymentOptions } from 'domains/account/store/selectors';

export interface IUseDisabledCurrencies {
  paymentType: EPaymentType;
}

export const useDisabledCurrencies = ({
  paymentType,
}: IUseDisabledCurrencies) => {
  const paymentOptionsData = useAppSelector(selectPaymentOptions);

  return useMemo(() => {
    const isRecurring = paymentType === EPaymentType.Recurring;
    const isDeal = paymentType === EPaymentType.Deal;
    const isDisabledStablecoins = paymentOptionsData === undefined;
    const oneTimePaymentCurrencies = isDisabledStablecoins
      ? [ECurrency.USDT, ECurrency.USDC]
      : undefined;

    return isRecurring || isDeal
      ? [ECurrency.ANKR, ECurrency.USDT, ECurrency.USDC]
      : oneTimePaymentCurrencies;
  }, [paymentType, paymentOptionsData]);
};
