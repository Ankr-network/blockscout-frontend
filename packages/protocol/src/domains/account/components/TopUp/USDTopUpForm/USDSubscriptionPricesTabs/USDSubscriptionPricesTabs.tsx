import { Skeleton } from '@material-ui/lab';

import { useUSDPaymentPricesTabs } from './USDSubscriptionPricesTabsUtils';
import { TabsManager } from 'uiKit/TabsManager';
import { useUSDSubscriptionPricesTabsStyles } from './USDSubscriptionPricesTabsStyles';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useUSDSubscriptionPrices } from 'domains/account/hooks/useUSDSubscriptionPrices';
import { USDSubscriptionPricesTabsProps } from './USDSubscriptionPricesTabsTypes';

export const USDSubscriptionPricesTabs = ({
  onChange,
}: USDSubscriptionPricesTabsProps) => {
  const { handleFetchSubscriptionPrices, prices, loading } =
    useUSDSubscriptionPrices();

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
