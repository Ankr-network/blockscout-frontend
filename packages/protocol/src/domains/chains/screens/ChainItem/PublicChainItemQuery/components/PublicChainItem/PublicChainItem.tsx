import { useMemo } from 'react';

import { ChainItemHeader } from 'domains/chains/screens/ChainItem/components/ChainItemHeader';
import { ChainItemSections } from 'domains/chains/screens/ChainItem/components/ChainItemSections';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { IPublicChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { useChainItemBreadcrumbs } from 'domains/chains/screens/ChainItem/hooks/useChainItemBreadcrumbs';
import { useRedirectToAdvancedApi } from 'domains/chains/screens/ChainItem/hooks/useRedirectToAdvancedApi';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';
import { isMultichain } from 'modules/chains/utils/isMultichain';
import { MultiChainBenefits } from 'modules/common/components/GetStartedSection/components/MultichainBenefits';
import { getPublicUrl } from 'domains/chains/utils/chainsUtils';

import { usePublicChainItem } from './hooks/usePublicChainItem';
import { AdvancedApiInfoTabs } from '../../../components/ChainItemSections/components/AdvancedApiInfoTabs';
import { UsageDataSection } from '../../../components/UsageDataSection';
import { useAvailableSections } from '../../../components/ChainItemSections/hooks/useAvailableSections';

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

  const rpcUrl = useMemo(
    () => unfilteredGroup?.urls[0]?.rpc ?? unfilteredGroup?.urls[0]?.rest,
    [unfilteredGroup],
  );

  const { timeframe, timeframeTabs } = useAvailableSections({
    chainType,
    chainSubType,
    chain,
    group,
    publicUrl: rpcUrl ? getPublicUrl(rpcUrl) : rpcUrl,
    hasPrivateAccess: false,
  });

  return (
    <>
      {isMultichain(chain.id) && <UpgradePlanBanner isPublicUser />}
      <ChainProtocolContext.Provider value={chainProtocolContext}>
        <ChainItemHeader headerContent={headerContent} />
        {isMultichain(chain.id) ? (
          <>
            <AdvancedApiInfoTabs />
            <MultiChainBenefits />
            <UsageDataSection
              chain={chain}
              chainType={chainType}
              chainSubType={chainSubType}
              group={group}
              timeframe={timeframe}
              timeframeTabs={timeframeTabs}
              hasPrivateAccess={false}
            />
          </>
        ) : (
          <ChainItemSections
            chainType={chainType}
            chainSubType={chainSubType}
            chain={data.chain}
            group={group}
            unfilteredGroup={unfilteredGroup}
          />
        )}
        <PlansDialog open={isOpened} onClose={onClose} />
      </ChainProtocolContext.Provider>
    </>
  );
};
