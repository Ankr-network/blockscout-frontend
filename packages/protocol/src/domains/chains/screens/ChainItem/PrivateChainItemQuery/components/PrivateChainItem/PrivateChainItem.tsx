import { t } from '@ankr.com/common';

import { H1Tag } from 'uiKit/H1Tag';
import { IPrivateChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { ChainItemHeader } from 'domains/chains/screens/ChainItem/components/ChainItemHeader';
import { ChainItemSections } from 'domains/chains/screens/ChainItem/components/ChainItemSections';
import { useChainItemBreadcrumbs } from 'domains/chains/screens/ChainItem/hooks/useChainItemBreadcrumbs';
import { useRedirectToAdvancedApi } from 'domains/chains/screens/ChainItem/hooks/useRedirectToAdvancedApi';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { PlansDialog } from 'modules/common/components/PlansDialog';

import { usePrivateChainItem } from './hooks/usePrivateChainItem';

export interface ChainItemProps {
  data: IPrivateChainItemDetails;
}

export const PrivateChainItem = ({ data }: ChainItemProps) => {
  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  const {
    chain,
    chainProtocolContext,
    chainSubType,
    chainType,
    group,
    headerContent,
    name,
    unfilteredGroup,
  } = usePrivateChainItem({
    ...data,
    shouldExpandFlareTestnets: false,
    onBlockedTabClick: onOpen,
    isGroupSelectorAutoWidth: true,
  });

  useRedirectToAdvancedApi();

  useChainItemBreadcrumbs(chain.name);

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
      <ChainItemHeader headerContent={headerContent} />
      <ChainItemSections
        chainType={chainType}
        chainSubType={chainSubType}
        chain={data.chain}
        group={group}
        unfilteredGroup={unfilteredGroup}
      />
      <PlansDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
