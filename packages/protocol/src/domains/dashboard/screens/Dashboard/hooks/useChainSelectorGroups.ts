import { useMemo } from 'react';

import { Chain, ChainID, ChainType } from 'modules/chains/types';
import { usePrivateChainItem } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { getStatsChainId } from 'domains/chains/screens/ChainItem/components/ChainItemSections/utils/getStatsChainId';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';
import { ChainGroupID } from 'modules/endpoints/types';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

interface IDashboardChainSelector {
  chain: Chain;

  selectedType?: ChainType;
  selectedGroupId?: ChainGroupID;
  onBlockedTabClick: () => void;
}

export const useChainSelectorGroups = ({
  chain,
  onBlockedTabClick,
  selectedGroupId,
  selectedType,
}: IDashboardChainSelector) => {
  const isFlare = chain.id === ChainID.FLARE;

  const {
    chainProtocolContext,
    chainSubType,
    chainSubTypes,
    chainType,
    chainTypes,
    endpoints,
    group,
    groupID,
    groups,
    selectGroup,
    selectSubType,
    selectType,
  } = usePrivateChainItem({
    chain,
    selectedType,
    selectedGroupId,
    shouldExpandFlareTestnets: isFlare,
    onBlockedTabClick,
  });

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const mappedChainId = getStatsChainId({
    publicChain: chain,
    chainType,
    chainSubType,
    group,
    isChainProtocolSwitchEnabled:
      chainProtocolContext.isChainProtocolSwitchEnabled,
    chainProtocol: chainProtocolContext.chainProtocol,
  });

  const ignoredIds = useMemo(
    // Tenet chain for enterprise stats has different chain id from mrpc
    () => (isEnterpriseClient ? [ChainID.TENET_EVM] : undefined),
    [isEnterpriseClient],
  );

  return {
    statsChainId: checkPrivateChainsAndGetChainId(mappedChainId, ignoredIds),
    detailsChainId: mappedChainId,
    chainProtocolContext,
    chainType,
    chainTypes,
    selectType,
    chainSubType,
    chainSubTypes,
    selectSubType,
    group,
    groups,
    groupID,
    selectGroup,
    endpoints,
  };
};
