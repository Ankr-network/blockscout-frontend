import { t } from '@ankr.com/common';

import { BeaconContext } from '../../../constants/BeaconContext';
import { ChainItemHeader } from '../../../components/ChainItemHeader';
import { ChainItemSections } from '../../../components/ChainItemSections';
import { H1Tag } from 'uiKit/H1Tag';
import { IChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
import { useChainItemBreadcrumbs } from '../../../hooks/useChainItemBreadcrumbs';
import { useDialog } from 'modules/common/hooks/useDialog';
import { usePublicChainItem } from './hooks/usePublicChainItem';
import { useRedirectToAdvancedApi } from '../../../hooks/useRedirectToAdvancedApi';

export interface ChainItemProps {
  data: IChainItemDetails;
}

export const PublicChainItem = ({ data }: ChainItemProps) => {
  const { isOpened, onOpen, onClose } = useDialog();

  const {
    beaconContext,
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
    <BeaconContext.Provider value={beaconContext}>
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
      <PremiumChainDialog open={isOpened} onClose={onClose} />
    </BeaconContext.Provider>
  );
};
