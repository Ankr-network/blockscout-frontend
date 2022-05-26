import React from 'react';
import { ToggleButton } from '@material-ui/lab';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './ChainItemTabsStyles';
import { Tab, TabsManager } from 'uiKit/TabsManager';
import { DataUsageContent } from '../DataUsageContent';
import { InfrastructureContent } from '../InfrastructureContent';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';

interface IChainItemTabsProps {
  chainId: string;
  data: IChainItemDetails;
}

export const ChainItemTabs = ({ chainId, data }: IChainItemTabsProps) => {
  const classes = useStyles();

  const tabs: Tab[] = [
    {
      id: 'dataUsage',
      content: <DataUsageContent chainId={chainId} />,
      title: (isSelected: boolean) => (
        <ToggleButton className={classes.button} selected={isSelected}>
          {t('chain-item.tabs.data')}
        </ToggleButton>
      ),
    },
    {
      id: 'infrastructure',
      content: <InfrastructureContent chainId={chainId} data={data} />,
      title: (isSelected: boolean) => (
        <ToggleButton className={classes.button} selected={isSelected}>
          {t('chain-item.tabs.infrastructure')}
        </ToggleButton>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      <TabsManager tabs={tabs} className={classes.manager} />
    </div>
  );
};
