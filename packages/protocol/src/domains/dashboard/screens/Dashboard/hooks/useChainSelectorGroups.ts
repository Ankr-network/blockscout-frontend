import { useMemo } from 'react';

import { Chain, ChainID, ChainType } from 'domains/chains/types';
import { usePrivateChainItem } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { getStatsChainId } from 'domains/chains/screens/ChainItem/components/ChainItemSections/utils/getStatsChainId';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';
import { ChainGroupID } from 'modules/endpoints/types';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

interface IDashboardChainSelector {
  chain: Chain;
  unfilteredChain: Chain;
  selectedType?: ChainType;
  selectedGroupId?: ChainGroupID;
  onBlockedTabClick: () => void;
}

export const useChainSelectorGroups = ({
  chain,
  unfilteredChain,
  selectedType,
  selectedGroupId,
  onBlockedTabClick,
}: IDashboardChainSelector) => {
  const {
    chainProtocolContext,
    publicChain,
    chainType,
    chainSubType,
    chainSubTypes,
    selectSubType,
    group,
    groups,
    groupID,
    selectGroup,
    chainTypes,
    selectType,
    endpoints,
  } = usePrivateChainItem({
    chain,
    unfilteredChain,
    isChainArchived: false,
    selectedType,
    selectedGroupId,
    onBlockedTabClick,
  });

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const mappedChainId = getStatsChainId({
    publicChain,
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
