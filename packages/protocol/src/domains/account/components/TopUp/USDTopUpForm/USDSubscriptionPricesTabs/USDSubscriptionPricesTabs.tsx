import { Skeleton } from '@material-ui/lab';
import { TabsManager } from 'uiKit/TabsManager';

import { USDSubscriptionPricesTabsProps } from './USDSubscriptionPricesTabsTypes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useUSDPaymentPricesTabs } from './USDSubscriptionPricesTabsUtils';
import { useUSDSubscriptionPrices } from 'domains/account/hooks/useUSDSubscriptionPrices';
import { useUSDSubscriptionPricesTabsStyles } from './USDSubscriptionPricesTabsStyles';

export const USDSubscriptionPricesTabs = ({
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
  const classes = useUSDSubscriptionPricesTabsStyles(tabs.length > 1);

  return loading ? (
    <Skeleton className={classes.skeleton} />
  ) : (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.root}
    />
  );
};
