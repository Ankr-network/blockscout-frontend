import { ReactNode } from 'react';

import { ChainTypeTab } from 'modules/common/components/ChainTypeTab';
import { t } from 'modules/i18n/utils/intl';
import { Tab, TabsManager } from 'uiKit/TabsManager';

import { useStyles } from './RPCEndpointsTabsManagerStyles';

export enum RPCEndpointsTabID {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  DEVNET = 'devnet',
}

export interface RPCEndpointsTabsManagerProps {
  additionalContent?: ReactNode;
  mainnetEndpoints: ReactNode;
  testnetEndpoints?: ReactNode;
  devnetEndpoints?: ReactNode;
  title: ReactNode;
}

// to avoid unnecessary re-creations
const mainnetEndpointsTitleRenderFn = (isSelected: boolean) => (
  <ChainTypeTab
    content={t('chain-item.header.mainnet-tab-title')}
    isSelected={isSelected}
  />
);
const testnetEndpointsTitleRenderFn = (isSelected: boolean) => (
  <ChainTypeTab
    content={t('chain-item.header.testnet-tab-title')}
    isSelected={isSelected}
  />
);

const devnetEndpointsTitleRenderFn = (isSelected: boolean) => (
  <ChainTypeTab
    content={t('chain-item.header.devnet-tab-title')}
    isSelected={isSelected}
  />
);

export const RPCEndpointsTabsManager = ({
  additionalContent,
  mainnetEndpoints,
  testnetEndpoints,
  devnetEndpoints,
  title,
}: RPCEndpointsTabsManagerProps) => {
  const classes = useStyles();

  const tabs: Tab[] = [
    {
      id: RPCEndpointsTabID.MAINNET,
      content: mainnetEndpoints,
      title: mainnetEndpointsTitleRenderFn,
    },
    {
      id: RPCEndpointsTabID.TESTNET,
      content: testnetEndpoints,
      title: testnetEndpointsTitleRenderFn,
    },
    {
      id: RPCEndpointsTabID.DEVNET,
      content: devnetEndpoints,
      title: devnetEndpointsTitleRenderFn,
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
