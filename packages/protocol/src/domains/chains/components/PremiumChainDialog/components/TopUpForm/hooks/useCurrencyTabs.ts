import { useMemo } from 'react';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { TabsManagerProps } from 'uiKit/TabsManager';
import { TopUpCurrency } from '../types';
import { renderTabTitle } from '../utils/renderTabTitle';

export interface UseCurrencyTabsResult {
  currency: TopUpCurrency;
  renderProps: TabsManagerProps;
  selectCurrency: (id: TopUpCurrency) => void;
}

export const useCurrencyTabs = (): UseCurrencyTabsResult => {
  const tabs: Tab<TopUpCurrency>[] = useMemo(
    () => [
      {
        id: TopUpCurrency.ANKR,
        title: (isSelected: boolean) =>
          renderTabTitle({ currency: TopUpCurrency.ANKR, isSelected }),
      },
      {
        id: TopUpCurrency.USD,
        title: (isSelected: boolean) =>
          renderTabTitle({ currency: TopUpCurrency.USD, isSelected }),
      },
    ],
    [],
  );

  const [currencyTabs, selectedTab, selectCurrency] = useTabs({ tabs });

  return {
    currency: selectedTab?.id ?? TopUpCurrency.USD,
    renderProps: {
      tabs: currencyTabs,
      selectedTab,
    },
    selectCurrency,
  };
};
