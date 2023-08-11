import { useMemo } from 'react';

import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';
import { useTabs } from 'modules/common/hooks/useTabs';

import { OnChange } from '../../../types';
import { getUSDPaymentTabs } from '../utils/getUSDPaymentTabs';
import { usePrices } from './usePrices';

export const useUSDPaymentTabs = (
  onChange: OnChange,
  initialTabID = ONE_TIME_PAYMENT_ID,
) => {
  const { prices, loading: pricesLoading } = usePrices();
  const { bundles, loading: bundlesLoading } = useBundlePaymentPlans({
    skipFetching: true,
  });

  const rawTabs = useMemo(
    () => getUSDPaymentTabs({ bundles, prices, onChange }),
    [bundles, prices, onChange],
  );

  const [tabs, selectedTab] = useTabs({ initialTabID, tabs: rawTabs });

  const loading = pricesLoading || bundlesLoading;

  return { loading, selectedTab, tabs };
};
