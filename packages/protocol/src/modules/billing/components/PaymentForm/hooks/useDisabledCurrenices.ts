import { useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';

export interface IUseDisabledCurrencies {
  paymentType: EPaymentType;
}

export const useDisabledCurrencies = ({
  paymentType,
}: IUseDisabledCurrencies) => {
  return useMemo(() => {
    const isRecurring = paymentType === EPaymentType.Recurring;
    const isDeal = paymentType === EPaymentType.Deal;

    return isRecurring || isDeal ? [ECurrency.ANKR] : undefined;
  }, [paymentType]);
};
