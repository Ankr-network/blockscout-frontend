import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { H1Tag } from 'uiKit/H1Tag';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainItemSections } from './components/ChainItemSections';
import { useChainItem } from './hooks/useChainItem';
import { useChainItemBreadcrumbs } from './hooks/useChainItemBreadcrumbs';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { ChainsItemDialog } from '../../components/ChainsItemDialog';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface ChainItemProps {
  data: IChainItemDetails;
}

export const ChainItem = ({ data }: ChainItemProps) => {
  const { isOpened, onOpen, onClose } = useDialog();

  const handleClick = useCallback(() => onOpen(), [onOpen]);

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
  } = useChainItem({
    ...data,
    onBlockedTestnetClick: handleClick,
  });

  useChainItemBreadcrumbs(chain.name);

  return (
    <>
      <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
      <ExpiredTokenBanner />
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
