import { useMemo } from 'react';

import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';
import { useTabs } from 'modules/common/hooks/useTabs';

import { USDSubscriptionPricesTabsProps } from '../USDSubscriptionPricesTabsTypes';
import { getUSDPaymentTabs } from '../utils/getUSDPaymentTabs';
import { usePrices } from './usePrices';

export type OnChange = USDSubscriptionPricesTabsProps['onChange'];

export const useUSDPaymentTabs = (
  onChange: OnChange,
  tabClassName: string,
  initialTabID = ONE_TIME_PAYMENT_ID,
) => {
  const { prices, loading: pricesLoading } = usePrices();
  const { bundles, loading: bundlesLoading } = useBundlePaymentPlans();

  const rawTabs = useMemo(
    () => getUSDPaymentTabs({ bundles, prices, onChange, tabClassName }),
    [bundles, prices, onChange, tabClassName],
  );

  const [tabs, selectedTab] = useTabs({ initialTabID, tabs: rawTabs });

  const loading = pricesLoading || bundlesLoading;

  return { loading, selectedTab, tabs };
};
