import { H1Tag } from 'uiKit/H1Tag';

import { AddEmailBanner } from 'domains/userSettings/components/AddEmailBanner';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainItemSections } from './components/ChainItemSections';
import { IChainItemDetails } from '../../actions/fetchChain';
import { t } from 'common';
import { useChainItem } from './hooks/useChainItem';
import { useChainItemBreadcrumbs } from './hooks/useChainItemBreadcrumbs';

export interface ChainItemProps {
  data: IChainItemDetails;
}

export const ChainItem = ({ data }: ChainItemProps) => {
  const {
    chain,
    chainType,
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
      <ChainItemSections chainType={chainType} data={data} group={group} />
    </>
  );
};
