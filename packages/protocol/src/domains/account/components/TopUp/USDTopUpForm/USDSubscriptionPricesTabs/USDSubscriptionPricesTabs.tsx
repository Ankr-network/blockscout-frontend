import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';
import { TabsManager } from 'uiKit/TabsManager';

import { USDSubscriptionPricesTabsProps } from './USDSubscriptionPricesTabsTypes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useUSDPaymentPricesTabs } from './USDSubscriptionPricesTabsUtils';
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
  const classes = useUSDSubscriptionPricesTabsStyles(tabs.length > 1);

  return loading ? (
    <Skeleton className={classNames(classes.skeleton, className)} />
  ) : (
    <TabsManager
      className={classNames(classes.root, className)}
      selectedTab={selectedTab}
      tabs={tabs}
    />
  );
};
