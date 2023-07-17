import { t } from '@ankr.com/common';

import { H1Tag } from 'uiKit/H1Tag';
import { IChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { ChainItemHeader } from '../../../components/ChainItemHeader';
import { ChainItemSections } from '../../../components/ChainItemSections';
import { usePrivateChainItem } from './hooks/usePrivateChainItem';
import { useChainItemBreadcrumbs } from '../../../hooks/useChainItemBreadcrumbs';
import { useRedirectToAdvancedApi } from '../../../hooks/useRedirectToAdvancedApi';
import { ChainProtocolContext } from '../../../constants/ChainProtocolContext';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

export interface ChainItemProps {
  data: IChainItemDetails;
}

export const PrivateChainItem = ({ data }: ChainItemProps) => {
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  const {
    chainProtocolContext,
    chain,
    publicChain,
    chainType,
    chainTypeTab,
    chainTypeTabs,
    group,
    chainSubType,
    chainSubTypeTab,
    chainSubTypeTabs,
    groups,
    unfilteredGroup,
    groupID,
    groupTab,
    groupTabs,
    name,
    selectGroup,
  } = usePrivateChainItem({
    ...data,
    onBlockedTabClick: onOpen,
  });

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
        chainSubType={chainSubType}
        chainSubTypeTab={chainSubTypeTab}
        chainSubTypeTabs={chainSubTypeTabs}
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
        chainSubType={chainSubType}
        data={data}
        group={group}
        unfilteredGroup={unfilteredGroup}
      />
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
