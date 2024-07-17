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
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';
import { isMultichain } from 'modules/chains/utils/isMultichain';

import { usePublicChainItem } from './hooks/usePublicChainItem';

export interface ChainItemProps {
  data: IPublicChainItemDetails;
}

export const PublicChainItem = ({ data }: ChainItemProps) => {
  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  const {
    chain,
    chainProtocolContext,
    chainSubType,
    chainType,
    group,
    headerContent,
    unfilteredGroup,
  } = usePublicChainItem({
    ...data,
    onBlockedTabClick: onOpen,
  });

  useRedirectToAdvancedApi();

  useChainItemBreadcrumbs(chain.name);

  return (
    <>
      {isMultichain(chain.id) && <UpgradePlanBanner isPublicUser />}
      <ChainProtocolContext.Provider value={chainProtocolContext}>
        <ChainItemHeader headerContent={headerContent} />
        <ChainItemSections
          chainType={chainType}
          chainSubType={chainSubType}
          chain={data.chain}
          group={group}
          unfilteredGroup={unfilteredGroup}
        />
        <UpgradePlanDialog open={isOpened} onClose={onClose} />
      </ChainProtocolContext.Provider>
    </>
  );
};
