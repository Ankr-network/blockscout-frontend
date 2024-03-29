import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ECurrency } from 'modules/billing/types';
import { Tab, TabsManager } from 'uiKit/TabsManager';

import { useCurrencyTabsStyles } from './useCurrencyTabsStyles';

export interface ICurrencyTabsProps {
  className?: string;
  selectedTab?: Tab<ECurrency>;
  tabs: Tab<ECurrency>[];
}

export const CurrencyTabs = ({
  className,
  selectedTab,
  tabs,
}: ICurrencyTabsProps) => {
  const { classes, cx } = useCurrencyTabsStyles();

  return (
    <div className={cx(classes.currencyTabsRoot, className)}>
      <Typography variant="subtitle2">
        {t('account.payment-form.currency-tabs-title')}
      </Typography>
      <TabsManager
        className={cx(classes.tabs, className)}
        classNameTab={classes.tab}
        classNameTabsInner={classes.tabsContainer}
        selectedTab={selectedTab}
        tabs={tabs}
      />
    </div>
  );
};
