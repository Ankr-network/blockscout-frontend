import { ChainItemHeader } from 'domains/chains/screens/ChainItem/components/ChainItemHeader';
import { ChainItemSections } from 'domains/chains/screens/ChainItem/components/ChainItemSections';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { IPublicChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { useChainItemBreadcrumbs } from 'domains/chains/screens/ChainItem/hooks/useChainItemBreadcrumbs';
import { useRedirectToAdvancedApi } from 'domains/chains/screens/ChainItem/hooks/useRedirectToAdvancedApi';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

import { usePublicChainItem } from './hooks/usePublicChainItem';

export interface ChainItemProps {
  data: IPublicChainItemDetails;
}

export const PublicChainItem = ({ data }: ChainItemProps) => {
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  const {
    chainProtocolContext,
    chain,
    chainType,
    chainSubType,
    group,
    unfilteredGroup,
    headerContent,
  } = usePublicChainItem({
    ...data,
    onBlockedTabClick: onOpen,
  });

  useRedirectToAdvancedApi();

  useChainItemBreadcrumbs(chain.name);

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <ChainItemHeader chain={chain} headerContent={headerContent} />
      <ChainItemSections
        chainType={chainType}
        chainSubType={chainSubType}
        chain={data.chain}
        group={group}
        unfilteredGroup={unfilteredGroup}
      />
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
