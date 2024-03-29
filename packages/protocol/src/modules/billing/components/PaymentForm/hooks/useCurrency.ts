import { useEffect } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';

import { useDisabledCurrencies } from './useDisabledCurrenices';
import { useCurrencyTabs } from '../components/CurrencyTabs';

export interface IUseCurrencyProps {
  paymentType: EPaymentType;
}

const initialTabID = ECurrency.USD;

export const useCurrency = ({ paymentType }: IUseCurrencyProps) => {
  const disabledCurrencies = useDisabledCurrencies({ paymentType });

  const { handleSelectCurrency, ...currencyTabsProps } = useCurrencyTabs({
    disabledCurrencies,
    initialTabID,
  });

  const currency = currencyTabsProps.selectedTab?.id ?? initialTabID;

  useEffect(
    () => handleSelectCurrency(ECurrency.USD),
    // We should track payment type changes only
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentType],
  );

  return { currency, currencyTabsProps };
};
