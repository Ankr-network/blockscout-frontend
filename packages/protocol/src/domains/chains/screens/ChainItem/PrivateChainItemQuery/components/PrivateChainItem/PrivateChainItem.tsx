import { t } from '@ankr.com/common';

import { H1Tag } from 'uiKit/H1Tag';
import { IChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { ChainItemHeader } from '../../../components/ChainItemHeader';
import { ChainItemSections } from '../../../components/ChainItemSections';
import { usePrivateChainItem } from './hooks/usePrivateChainItem';
import { useChainItemBreadcrumbs } from '../../../hooks/useChainItemBreadcrumbs';
import { useRedirectToAdvancedApi } from '../../../hooks/useRedirectToAdvancedApi';
import { ChainProtocolContext } from '../../../constants/ChainProtocolContext';

export interface ChainItemProps {
  data: IChainItemDetails;
}

export const PrivateChainItem = ({ data }: ChainItemProps) => {
  const {
    chainProtocolContext,
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
    name,
    selectGroup,
  } = usePrivateChainItem({ ...data });

  useRedirectToAdvancedApi();

  useChainItemBreadcrumbs(chain.name);

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
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
        isChainArchived={data.isChainArchived}
        selectGroup={selectGroup}
      />
      <ChainItemSections
        chainType={chainType}
        data={data}
        group={group}
        unfilteredGroup={unfilteredGroup}
      />
    </ChainProtocolContext.Provider>
  );
};
