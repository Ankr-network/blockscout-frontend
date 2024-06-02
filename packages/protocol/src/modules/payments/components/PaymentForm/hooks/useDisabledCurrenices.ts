import { useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/payments/types';
import { cryptoCurrencies, stablecoinCurrencies } from 'modules/payments/const';
import { usePaymentOptions } from 'modules/payments/hooks/usePaymentOptions';

export interface IUseDisabledCurrencies {
  currency: ECurrency;
  paymentType: EPaymentType;
}

const disabledCurrenciesMap: Record<EPaymentType, ECurrency[] | undefined> = {
  [EPaymentType.Deal]: cryptoCurrencies,
  [EPaymentType.Recurring]: cryptoCurrencies,
  [EPaymentType.OneTime]: undefined,
};

export const useDisabledCurrencies = ({
  paymentType,
}: IUseDisabledCurrencies) => {
  const { paymentOptions } = usePaymentOptions({ skipFetching: true });

  const isStablecoinDisabled = typeof paymentOptions === 'undefined';

  return useMemo(() => {
    const disabledCurrencies = disabledCurrenciesMap[paymentType];

    if (isStablecoinDisabled && !disabledCurrencies) {
      return stablecoinCurrencies;
    }

    return disabledCurrencies;
  }, [isStablecoinDisabled, paymentType]);
};
