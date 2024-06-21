import { useMemo } from 'react';

import { ECurrency } from 'modules/payments/types';
import { useTabs } from 'modules/common/hooks/useTabs';

import { ECurrencyTab, getCurrencyTabs } from '../utils/getCurrencyTabs';

export interface IUseCurrencyTabsProps {
  disabledCurrencies?: ECurrency[];
  initialTabID?: ECurrencyTab;
  onCurrencyTabSelect?: (id: ECurrencyTab) => void;
}

export const useCurrencyTabs = ({
  disabledCurrencies,
  initialTabID,
  onCurrencyTabSelect,
}: IUseCurrencyTabsProps | void = {}) => {
  const rawTabs = useMemo(
    () => getCurrencyTabs({ disabledCurrencies }),
    [disabledCurrencies],
  );

  const [tabs, selectedTab, handleSelectCurrencyTab] = useTabs({
    initialTabID,
    onTabSelect: onCurrencyTabSelect,
    tabs: rawTabs,
  });

  return { handleSelectCurrencyTab, selectedTab, tabs };
};
