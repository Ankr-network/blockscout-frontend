import { useCallback, useEffect, useState } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';

import { useDisabledCurrencies } from './useDisabledCurrenices';
import { useCurrencyTabs } from '../components/CurrencyTabs';
import { ECurrencyTab } from '../components/CurrencyTabs/utils/getCurrencyTabs';

export interface IUseCurrencyProps {
  paymentType: EPaymentType;
}

const initialTabID = ECurrencyTab.USD;

export const useCurrency = ({ paymentType }: IUseCurrencyProps) => {
  const disabledCurrencies = useDisabledCurrencies({ paymentType });

  const [currency, setCurrency] = useState(ECurrency.USD);

  const { handleSelectCurrencyTab, ...currencyTabsProps } = useCurrencyTabs({
    disabledCurrencies,
    initialTabID,
  });

  const { selectedTab } = currencyTabsProps;

  useEffect(() => {
    if (selectedTab?.id === ECurrencyTab.ANKR) {
      setCurrency(ECurrency.ANKR);
    }

    if (selectedTab?.id === ECurrencyTab.USD) {
      setCurrency(ECurrency.USD);
    }

    if (selectedTab?.id === ECurrencyTab.STABLECOIN) {
      setCurrency(ECurrency.USDT);
    }
  }, [selectedTab]);

  const handleChangeCurrency = useCallback(
    (newCurrency: ECurrency) => {
      setCurrency(newCurrency);
    },
    [setCurrency],
  );

  useEffect(
    () => {
      handleSelectCurrencyTab(ECurrencyTab.USD);
      setCurrency(ECurrency.USD);
    },
    // We should track payment type changes only
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentType],
  );

  return { currency, currencyTabsProps, handleChangeCurrency };
};
