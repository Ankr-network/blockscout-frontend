import { useMemo } from 'react';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { TabsManagerProps } from 'uiKit/TabsManager';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { TopUpCurrency } from '../types';
import { renderTabTitle } from '../utils/renderTabTitle';

export interface UseCurrencyTabsResult {
  currency: TopUpCurrency;
  renderProps: TabsManagerProps;
  selectCurrency: (id: TopUpCurrency) => void;
}

export const useCurrencyTabs = (
  initialTabID?: TopUpCurrency,
): UseCurrencyTabsResult => {
  const { isUserEthAddressType } = useAuth();

  const tabs: Tab<TopUpCurrency>[] = useMemo(
    () => [
      {
        id: TopUpCurrency.ANKR,
        isDisabled: !isUserEthAddressType,
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
    [isUserEthAddressType],
  );

  const [currencyTabs, selectedTab, selectCurrency] = useTabs({
    initialTabID,
    tabs,
  });

  return {
    currency: selectedTab?.id ?? TopUpCurrency.USD,
    renderProps: {
      tabs: currencyTabs,
      selectedTab,
    },
    selectCurrency,
  };
};
