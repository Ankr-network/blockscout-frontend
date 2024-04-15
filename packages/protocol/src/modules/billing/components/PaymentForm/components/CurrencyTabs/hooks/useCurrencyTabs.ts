import { useMemo } from 'react';

import { ECurrency } from 'modules/billing/types';
import { useTabs } from 'modules/common/hooks/useTabs';

import { getCurrencyTabs } from '../utils/getCurrencyTabs';

export interface IUseCurrencyTabsProps {
  disabledCurrencies?: ECurrency[];
  initialTabID?: ECurrency;
  onCurrencySelect?: (id: ECurrency) => void;
}

export const useCurrencyTabs = ({
  disabledCurrencies,
  initialTabID,
  onCurrencySelect,
}: IUseCurrencyTabsProps | void = {}) => {
  const rawTabs = useMemo(
    () => getCurrencyTabs({ disabledCurrencies }),
    [disabledCurrencies],
  );

  const [tabs, selectedTab, handleSelectCurrency] = useTabs({
    initialTabID,
    onTabSelect: onCurrencySelect,
    tabs: rawTabs,
  });

  return { handleSelectCurrency, selectedTab, tabs };
};
