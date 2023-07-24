import { Skeleton } from '@mui/material';

import { TabsManager } from 'uiKit/TabsManager';

import { USDSubscriptionPricesTabsProps } from './USDSubscriptionPricesTabsTypes';
import { useUSDPaymentTabs } from './hooks/useUSDPaymentTabs';
import { useUSDSubscriptionPricesTabsStyles } from './USDSubscriptionPricesTabsStyles';

export const USDSubscriptionPricesTabs = ({
  className,
  onChange,
  tabClassName,
}: USDSubscriptionPricesTabsProps) => {
  const { loading, selectedTab, tabs } = useUSDPaymentTabs(
    onChange,
    tabClassName,
  );

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
