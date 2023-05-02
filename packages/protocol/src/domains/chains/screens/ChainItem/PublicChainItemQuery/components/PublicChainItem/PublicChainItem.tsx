import { t } from '@ankr.com/common';

import { ChainItemHeader } from '../../../components/ChainItemHeader';
import { ChainItemSections } from '../../../components/ChainItemSections';
import { ChainProtocolContext } from '../../../constants/ChainProtocolContext';
import { H1Tag } from 'uiKit/H1Tag';
import { IChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useChainItemBreadcrumbs } from '../../../hooks/useChainItemBreadcrumbs';
import { usePublicChainItem } from './hooks/usePublicChainItem';
import { useRedirectToAdvancedApi } from '../../../hooks/useRedirectToAdvancedApi';

export interface ChainItemProps {
  data: IChainItemDetails;
}

export const PublicChainItem = ({ data }: ChainItemProps) => {
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

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
  } = usePublicChainItem({
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
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
