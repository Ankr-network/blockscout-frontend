import { Skeleton } from '@mui/material';

import { useUSDPaymentPricesTabs } from './USDSubscriptionPricesTabsUtils';
import { TabsManager } from 'uiKit/TabsManager';
import { USDSubscriptionPricesTabsProps } from './USDSubscriptionPricesTabsTypes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useUSDSubscriptionPrices } from 'domains/account/hooks/useUSDSubscriptionPrices';
import { useUSDSubscriptionPricesTabsStyles } from './USDSubscriptionPricesTabsStyles';

export const USDSubscriptionPricesTabs = ({
  className,
  onChange,
}: USDSubscriptionPricesTabsProps) => {
  const {
    handleFetchSubscriptionPrices,
    prices = [],
    loading,
  } = useUSDSubscriptionPrices();

  useOnMount(() => {
    handleFetchSubscriptionPrices();
  });

  const [tabs, selectedTab] = useUSDPaymentPricesTabs(prices, onChange);
  const { classes, cx } = useUSDSubscriptionPricesTabsStyles(tabs.length > 1);

  return loading ? (
    <Skeleton className={cx(classes.skeleton, className)} />
  ) : (
    <TabsManager
      className={cx(classes.root, className)}
      selectedTab={selectedTab}
      tabs={tabs}
    />
  );
};
