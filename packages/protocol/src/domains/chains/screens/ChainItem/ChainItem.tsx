import { H1Tag } from 'uiKit/H1Tag';

import { AddEmailBanner } from 'domains/userSettings/components/AddEmailBanner';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainItemTabs } from './components/ChainItemTabs';
import { IChainItemDetails } from '../../actions/fetchChain';
import { t } from 'common';
import { useChainItem } from './hooks/useChainItem';
import { useChainItemBreadcrumbs } from './hooks/useChainItemBreadcrumbs';
import { MaintenanceBanner } from './components/MaintenanceBanner';

export interface ChainItemProps {
  data: IChainItemDetails;
}

export const ChainItem = ({ data }: ChainItemProps) => {
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
      <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
      <MaintenanceBanner />
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
