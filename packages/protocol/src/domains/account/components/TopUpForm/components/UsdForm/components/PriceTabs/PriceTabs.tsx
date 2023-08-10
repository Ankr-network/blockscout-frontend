import { Skeleton } from '@mui/material';

import { TabsManager } from 'uiKit/TabsManager';

import { PriceTabsProps } from './types';
import { usePriceTabsStyles } from './PriceTabsStyles';
import { useUSDPaymentTabs } from './hooks/useUSDPaymentTabs';

export const PriceTabs = ({
  className,
  initialTabID,
  onChange,
}: PriceTabsProps) => {
  const { loading, selectedTab, tabs } = useUSDPaymentTabs(
    onChange,
    initialTabID,
  );

  const { classes, cx } = usePriceTabsStyles(tabs.length > 1);

  if (loading) {
    return <Skeleton className={cx(classes.skeleton, className)} />;
  }

  return (
    <TabsManager
      className={cx(classes.root, className)}
      selectedTab={selectedTab}
      tabs={tabs}
    />
  );
};
