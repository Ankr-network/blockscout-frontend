import React from 'react';
import { ToggleButton } from '@material-ui/lab';

import { DataUsageContent } from '../DataUsageContent';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { InfrastructureContent } from '../InfrastructureContent';
import { IntegrationContent } from '../IntegrationContent';
import { Tab, TabsManager } from 'uiKit/TabsManager';
import { TabId, useInitialTabId, useRedirect } from './ChainItemTabsUtils';
import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { useStyles } from './ChainItemTabsStyles';
import { useTabsFilter } from './hooks/useTabsFilter';

interface IChainItemTabsProps {
  chainId: string;
  data: IChainItemDetails;
}

export const ChainItemTabs = ({ chainId, data }: IChainItemTabsProps) => {
  const [withIntegrationTab, tabsFilter] = useTabsFilter(data.chain);
  const initialTabId = useInitialTabId(withIntegrationTab);
  const classes = useStyles();

  const tabs: Tab[] = useLocaleMemo(
    () =>
      [
        {
          id: TabId.data,
          content: <DataUsageContent chainId={chainId} />,
          title: (isSelected: boolean) => (
            <ToggleButton className={classes.button} selected={isSelected}>
              {t('chain-item.tabs.data')}
            </ToggleButton>
          ),
        },
        {
          id: TabId.infrastructure,
          content: <InfrastructureContent chainId={chainId} data={data} />,
          title: (isSelected: boolean) => (
            <ToggleButton className={classes.button} selected={isSelected}>
              {t('chain-item.tabs.infrastructure')}
            </ToggleButton>
          ),
        },
        {
          id: TabId.integration,
          content: <IntegrationContent />,
          title: (isSelected: boolean) => (
            <ToggleButton className={classes.button} selected={isSelected}>
              {t('chain-item.tabs.integration')}
            </ToggleButton>
          ),
        },
      ].filter(tabsFilter),
    [tabsFilter],
  );

  const redirect = useRedirect(chainId);

  return (
    <div className={classes.root}>
      <TabsManager
        tabs={tabs}
        className={classes.manager}
        initialTabID={initialTabId}
        onTabSelect={redirect}
      />
    </div>
  );
};
