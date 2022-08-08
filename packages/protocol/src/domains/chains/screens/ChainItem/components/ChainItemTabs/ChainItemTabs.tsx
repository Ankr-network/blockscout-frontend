import React from 'react';

import { ChainItemTab } from './components/ChainItemTab';
import { DataUsageContent } from '../DataUsageContent';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { InfrastructureContent } from '../InfrastructureContent';
import { IntegrationContent } from '../IntegrationContent';
import { Tab, TabsManager } from 'uiKit/TabsManager';
import { TabId, useInitialTabId, useRedirect } from './ChainItemTabsUtils';
import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { useStyles } from './ChainItemTabsStyles';
import { useTabs } from 'modules/common/hooks/useTabs';
import { useTabsFilter } from './hooks/useTabsFilter';

interface IChainItemTabsProps {
  chainId: string;
  data: IChainItemDetails;
}

export const ChainItemTabs = ({ chainId, data }: IChainItemTabsProps) => {
  const [withGetStartedTab, tabsFilter] = useTabsFilter(data.chain);
  const initialTabID = useInitialTabId(withGetStartedTab);
  const classes = useStyles();

  const rawTabs: Tab[] = useLocaleMemo(
    () =>
      [
        {
          id: TabId.GetStarted,
          content: <IntegrationContent />,
          title: (isSelected: boolean) => (
            <ChainItemTab
              isSelected={isSelected}
              label={t('chain-item.tabs.get-started')}
            />
          ),
        },
        {
          id: TabId.UsageData,
          content: <DataUsageContent chainId={chainId} />,
          title: (isSelected: boolean) => (
            <ChainItemTab
              isSelected={isSelected}
              label={t('chain-item.tabs.usage-data')}
            />
          ),
        },
        {
          id: TabId.Infrastructure,
          content: <InfrastructureContent chainId={chainId} data={data} />,
          title: (isSelected: boolean) => (
            <ChainItemTab
              isSelected={isSelected}
              label={t('chain-item.tabs.infrastructure')}
            />
          ),
        },
      ].filter(tabsFilter),
    [tabsFilter],
  );

  const redirect = useRedirect(chainId);
  const [tabs, selectedTab] = useTabs({
    initialTabID,
    onTabSelect: redirect,
    tabs: rawTabs,
  });

  return (
    <div className={classes.root}>
      <TabsManager
        className={classes.tabs}
        selectedTab={selectedTab}
        tabs={tabs}
      />
    </div>
  );
};
