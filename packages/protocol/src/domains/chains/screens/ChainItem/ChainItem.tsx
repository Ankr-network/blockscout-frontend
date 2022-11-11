import { t } from 'common';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { H1Tag } from 'uiKit/H1Tag';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainItemSections } from './components/ChainItemSections';
import { useChainItem } from './hooks/useChainItem';
import { useChainItemBreadcrumbs } from './hooks/useChainItemBreadcrumbs';

export interface ChainItemProps {
  data: IChainItemDetails;
}

export const ChainItem = ({ data }: ChainItemProps) => {
  const {
    chain,
    publicChain,
    chainType,
    chainTypeTab,
    chainTypeTabs,
    group,
    groups,
    unfilteredGroup,
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
      <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
      <ChainItemHeader
        chain={chain}
        publicChain={publicChain}
        chainType={chainType}
        chainTypeTabs={chainTypeTabs}
        chainTypeTab={chainTypeTab}
        group={group}
        groups={groups}
        groupID={groupID}
        groupTabs={groupTabs}
        groupTab={groupTab}
        isChainArchived={isChainArchived}
        selectGroup={selectGroup}
      />
      <ChainItemSections
        chainType={chainType}
        data={data}
        group={group}
        unfilteredGroup={unfilteredGroup}
      />
    </>
  );
};
