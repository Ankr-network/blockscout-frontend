import React, { ReactNode } from 'react';

import { useStyles } from './RPCEndpointsTabsManagerStyles';
import { Tab, TabsManager } from 'uiKit/TabsManager';
import { TabTitle } from './TabTitle';
import { t } from 'modules/i18n/utils/intl';

export interface RPCEndpointsTabsManagerProps {
  additionalContent?: ReactNode;
  mainnetEndpoints: ReactNode;
  testnetEndpoints?: ReactNode;
  title: ReactNode;
}

// to avoid unnecessary re-creations
const mainnetEndpointsTitleRenderFn = (isSelected: boolean) => (
  <TabTitle
    content={t('chain-item.header.mainnet-tab-title')}
    isSelected={isSelected}
  />
);
const testnetEndpointsTitleRenderFn = (isSelected: boolean) => (
  <TabTitle
    content={t('chain-item.header.testnet-tab-title')}
    isSelected={isSelected}
  />
);

export const RPCEndpointsTabsManager = ({
  additionalContent,
  mainnetEndpoints,
  testnetEndpoints,
  title,
}: RPCEndpointsTabsManagerProps) => {
  const classes = useStyles();

  const tabs: Tab[] = [
    {
      id: 'public',
      content: mainnetEndpoints,
      title: mainnetEndpointsTitleRenderFn,
    },
    {
      id: 'testnet',
      content: testnetEndpoints,
      title: testnetEndpointsTitleRenderFn,
    },
  ].filter(({ content }) => !!content);

  const titleElement = <div className={classes.title}>{title}</div>;

  return (
    <TabsManager
      additionalContent={additionalContent}
      title={titleElement}
      tabs={tabs}
    />
  );
};
