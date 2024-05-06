import { useMemo } from 'react';

import { ECurrency } from 'modules/billing/types';
import { useTabs } from 'modules/common/hooks/useTabs';

import { ECurrencyTab, getCurrencyTabs } from '../utils/getCurrencyTabs';

export interface IUseCurrencyTabsProps {
  disabledCurrencies?: ECurrency[];
  initialTabID?: ECurrencyTab;
  onCurrencySelect?: (id: ECurrencyTab) => void;
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

  const [tabs, selectedTab, handleSelectCurrencyTab] = useTabs({
    initialTabID,
    onTabSelect: onCurrencySelect,
    tabs: rawTabs,
  });

  return { handleSelectCurrencyTab, selectedTab, tabs };
};
