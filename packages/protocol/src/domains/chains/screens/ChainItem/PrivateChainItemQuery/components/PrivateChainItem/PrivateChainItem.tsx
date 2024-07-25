import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { H1Tag } from 'uiKit/H1Tag';
import { IPrivateChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { ChainItemHeader } from 'domains/chains/screens/ChainItem/components/ChainItemHeader';
import { useChainItemBreadcrumbs } from 'domains/chains/screens/ChainItem/hooks/useChainItemBreadcrumbs';
import { useRedirectToAdvancedApi } from 'domains/chains/screens/ChainItem/hooks/useRedirectToAdvancedApi';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { getPublicUrl } from 'domains/chains/utils/chainsUtils';
import { useAvailableSections } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useAvailableSections';
import { UsageDataSection } from 'domains/chains/screens/ChainItem/components/UsageDataSection';
import { isMultichain } from 'modules/chains/utils/isMultichain';
import { MultiChainBenefits } from 'modules/common/components/GetStartedSection/components/MultichainBenefits';
import { AdvancedApiInfoTabs } from 'domains/chains/screens/ChainItem/components/ChainItemSections/components/AdvancedApiInfoTabs';
import { PlansDialog } from 'modules/common/components/PlansDialog';

import { PrivateChainRequestsWidget } from '../PrivateChainRequestsWidget';
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

  const { hasPrivateAccess, isLoggedIn } = useAuth();

  const rpcUrl = useMemo(
    () => unfilteredGroup?.urls[0]?.rpc ?? unfilteredGroup?.urls[0]?.rest,
    [unfilteredGroup],
  );

  useRedirectToAdvancedApi();

  useChainItemBreadcrumbs(chain.name);

  const { timeframe, timeframeTabs } = useAvailableSections({
    chainType,
    chainSubType,
    chain,
    group,
    publicUrl: isLoggedIn ? getPublicUrl(rpcUrl) : rpcUrl,
    hasPrivateAccess,
  });

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
      <ChainItemHeader headerContent={headerContent} />
      <PrivateChainRequestsWidget
        chain={chain}
        chainType={chainType}
        chainSubType={chainSubType}
        group={group}
      />
      {isMultichain(chain.id) && (
        <>
          <AdvancedApiInfoTabs />
          <MultiChainBenefits />
        </>
      )}
      <UsageDataSection
        chain={chain}
        chainType={chainType}
        chainSubType={chainSubType}
        group={group}
        timeframe={timeframe}
        timeframeTabs={timeframeTabs}
        hasPrivateAccess={hasPrivateAccess || isEnterpriseClient}
      />
      <PlansDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
