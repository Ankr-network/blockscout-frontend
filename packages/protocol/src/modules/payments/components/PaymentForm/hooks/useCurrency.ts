import { useCallback, useEffect, useState } from 'react';

import { ECurrency, EPaymentType } from 'modules/payments/types';

import { ECurrencyTab } from '../components/CurrencyTabs/utils/getCurrencyTabs';
import { useCurrencyTabs } from '../components/CurrencyTabs';
import { useDisabledCurrencies } from './useDisabledCurrenices';

export interface IUseCurrencyProps {
  initialCurrency?: ECurrency;
  paymentType: EPaymentType;
}

const currencyTabToCurrencyMap: Record<ECurrencyTab, ECurrency> = {
  [ECurrencyTab.ANKR]: ECurrency.ANKR,
  [ECurrencyTab.USD]: ECurrency.USD,
  [ECurrencyTab.STABLECOIN]: ECurrency.USDT,
};

const currencyToCurrencyTabMap: Record<ECurrency, ECurrencyTab> = {
  [ECurrency.ANKR]: ECurrencyTab.ANKR,
  [ECurrency.USD]: ECurrencyTab.USD,
  [ECurrency.USDC]: ECurrencyTab.STABLECOIN,
  [ECurrency.USDT]: ECurrencyTab.STABLECOIN,
};

export const useCurrency = ({
  initialCurrency = ECurrency.USD,
  paymentType,
}: IUseCurrencyProps) => {
  const [currency, setCurrency] = useState(initialCurrency);

  const disabledCurrencies = useDisabledCurrencies({ currency, paymentType });

  const onCurrencyTabSelect = useCallback(
    (tabId: ECurrencyTab) => setCurrency(currencyTabToCurrencyMap[tabId]),
    [],
  );

  const { handleSelectCurrencyTab, ...currencyTabsProps } = useCurrencyTabs({
    disabledCurrencies,
    initialTabID: currencyToCurrencyTabMap[initialCurrency],
    onCurrencyTabSelect,
  });

  const handleCurrencyChange = setCurrency;

  useEffect(
    () => {
      handleSelectCurrencyTab(currencyToCurrencyTabMap[initialCurrency]);
      setCurrency(initialCurrency);
    },
    // We should track payment type changes only
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentType],
  );

  return { currency, currencyTabsProps, handleCurrencyChange };
};
