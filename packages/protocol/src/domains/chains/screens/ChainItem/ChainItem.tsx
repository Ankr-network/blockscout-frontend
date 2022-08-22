import { H1Tag } from 'uiKit/H1Tag';

import { t } from 'common';
import { AddEmailBanner } from 'domains/userSettings/components/AddEmailBanner';
import { IChainItemDetails } from '../../actions/fetchChain';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainItemTabs } from './components/ChainItemTabs';
import { useChainItem } from './hooks/useChainItem';
import { useChainItemBreadcrumbs } from './hooks/useChainItemBreadcrumbs';
import { MaintenanceBanner } from './components/MaintenanceBanner';

export interface ChainItemProps {
  data: IChainItemDetails;
  hasCredentials: boolean;
}

export const ChainItem = ({ data, hasCredentials }: ChainItemProps) => {
  const {
    chain,
    chainTypeTab,
    chainTypeTabs,
    group,
    groupID,
    groupTab,
    groupTabs,
    isChainArchived,
    name,
    selectGroup,
  } = useChainItem(data);

  useChainItemBreadcrumbs(chain.name);

  return (
    <>
      <AddEmailBanner />
      {hasCredentials && <MaintenanceBanner />}
      <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
      <ChainItemHeader
        chain={chain}
        chainTypeTabs={chainTypeTabs}
        chainTypeTab={chainTypeTab}
        groupID={groupID}
        groupTabs={groupTabs}
        groupTab={groupTab}
        isChainArchived={isChainArchived}
        selectGroup={selectGroup}
      />
      <ChainItemTabs data={data} group={group} />
    </>
  );
};
