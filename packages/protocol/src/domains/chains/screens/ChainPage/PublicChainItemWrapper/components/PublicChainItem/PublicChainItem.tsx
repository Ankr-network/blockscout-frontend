import { Chain } from '@ankr.com/chains-list';

import { ChainItemHeader } from 'domains/chains/screens/ChainPage/components/ChainItemHeader';
import { ChainProtocolContext } from 'domains/chains/screens/ChainPage/constants/ChainProtocolContext';
import { useChainItemBreadcrumbs } from 'domains/chains/screens/ChainPage/hooks/useChainItemBreadcrumbs';
import { useRedirectToAdvancedApi } from 'domains/chains/screens/ChainPage/hooks/useRedirectToAdvancedApi';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { isMultichain } from 'modules/chains/utils/isMultichain';
import { MultiChainBenefits } from 'modules/common/components/GetStartedSection/components/MultichainBenefits';

import { usePublicChainItem } from './hooks/usePublicChainItem';
import { AdvancedApiInfoTabs } from '../../../components/ChainItemSections/components/AdvancedApiInfoTabs';
import { UsageDataSection } from '../../../components/UsageDataSection';

export interface ChainItemProps {
  data: { chain: Chain; unfilteredChain: Chain };
}

export const PublicChainItem = ({ data }: ChainItemProps) => {
  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  const { chain, chainProtocolContext, headerContent } = usePublicChainItem({
    ...data,
    onBlockedTabClick: onOpen,
  });

  useRedirectToAdvancedApi();

  useChainItemBreadcrumbs(chain.name);

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <ChainItemHeader headerContent={headerContent} />
      {isMultichain(chain.id) && (
        <>
          <AdvancedApiInfoTabs />
          <MultiChainBenefits />
        </>
      )}
      <UsageDataSection chain={chain} />
      <PlansDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
