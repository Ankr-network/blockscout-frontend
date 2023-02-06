import { t } from '@ankr.com/common';

import { H1Tag } from 'uiKit/H1Tag';
import { IChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { ChainItemHeader } from '../../../components/ChainItemHeader';
import { ChainItemSections } from '../../../components/ChainItemSections';
import { ChainsItemDialog } from 'domains/chains/components/ChainsItemDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { usePublicChainItem } from './hooks/usePublicChainItem';
import { useChainItemBreadcrumbs } from '../../../hooks/useChainItemBreadcrumbs';
import { useRedirectToAdvancedApi } from '../../../hooks/useRedirectToAdvancedApi';

export interface ChainItemProps {
  data: IChainItemDetails;
}

export const PublicChainItem = ({ data }: ChainItemProps) => {
  const { isOpened, onOpen, onClose } = useDialog();

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
    name,
    selectGroup,
  } = usePublicChainItem({
    ...data,
    onBlockedTestnetClick: onOpen,
  });

  useRedirectToAdvancedApi();

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
        isChainArchived={data.isChainArchived}
        selectGroup={selectGroup}
      />
      <ChainItemSections
        chainType={chainType}
        data={data}
        group={group}
        unfilteredGroup={unfilteredGroup}
      />
      <ChainsItemDialog open={isOpened} onClose={onClose} />
    </>
  );
};
