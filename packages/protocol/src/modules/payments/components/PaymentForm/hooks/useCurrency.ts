import { useCallback, useEffect, useState } from 'react';

import { ECurrency, EPaymentType } from 'modules/payments/types';

import { ECurrencyTab } from '../components/CurrencyTabs/utils/getCurrencyTabs';
import { useCurrencyTabs } from '../components/CurrencyTabs';
import { useDisabledCurrencies } from './useDisabledCurrenices';

export interface IUseCurrencyProps {
  paymentType: EPaymentType;
}

const initialTabID = ECurrencyTab.USD;

const currencyTabToCurrencyMap: Record<ECurrencyTab, ECurrency> = {
  [ECurrencyTab.ANKR]: ECurrency.ANKR,
  [ECurrencyTab.USD]: ECurrency.USD,
  [ECurrencyTab.STABLECOIN]: ECurrency.USDT,
};

export const useCurrency = ({ paymentType }: IUseCurrencyProps) => {
  const [currency, setCurrency] = useState(ECurrency.USD);

  const disabledCurrencies = useDisabledCurrencies({ currency, paymentType });

  const onCurrencyTabSelect = useCallback(
    (tabId: ECurrencyTab) => setCurrency(currencyTabToCurrencyMap[tabId]),
    [],
  );

  const { handleSelectCurrencyTab, ...currencyTabsProps } = useCurrencyTabs({
    disabledCurrencies,
    initialTabID,
    onCurrencyTabSelect,
  });

  const handleCurrencyChange = setCurrency;

  useEffect(
    () => {
      handleSelectCurrencyTab(ECurrencyTab.USD);
      setCurrency(ECurrency.USD);
    },
    // We should track payment type changes only
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentType],
  );

  return { currency, currencyTabsProps, handleCurrencyChange };
};
