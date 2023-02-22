import { useMemo } from 'react';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { TabsManagerProps } from 'uiKit/TabsManager';
import { TopUpCurrency } from '../types';
import { renderTabTitle } from '../utils/renderTabTitle';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface UseCurrencyTabsResult {
  currency: TopUpCurrency;
  renderProps: TabsManagerProps;
  selectCurrency: (id: TopUpCurrency) => void;
}

export const useCurrencyTabs = (): UseCurrencyTabsResult => {
  const { isFreePremium } = useAuth();

  const tabs: Tab<TopUpCurrency>[] = useMemo(
    () => [
      {
        id: TopUpCurrency.ANKR,
        isDisabled: isFreePremium,
        title: (isSelected: boolean, isDisabled: boolean) =>
          renderTabTitle({
            currency: TopUpCurrency.ANKR,
            isDisabled,
            isSelected,
          }),
      },
      {
        id: TopUpCurrency.USD,
        title: (isSelected: boolean) =>
          renderTabTitle({ currency: TopUpCurrency.USD, isSelected }),
      },
    ],
    [isFreePremium],
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
