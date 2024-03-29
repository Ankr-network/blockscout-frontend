import { EPaymentType } from 'modules/billing/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { TabsManager } from 'uiKit/TabsManager';

import { usePaymentTabsStyles } from './usePaymentTabsStyles';

export interface IPaymentTabsProps {
  className?: string;
  selectedTab?: Tab<EPaymentType>;
  tabs: Tab<EPaymentType>[];
}

export const PaymentTabs = ({
  className,
  selectedTab,
  tabs,
}: IPaymentTabsProps) => {
  const { classes, cx } = usePaymentTabsStyles();

  return (
    <TabsManager
      className={cx(classes.paymentTabsRoot, className)}
      classNameTab={classes.tab}
      classNameTabsInner={classes.tabsContainer}
      selectedTab={selectedTab}
      tabs={tabs}
    />
  );
};
