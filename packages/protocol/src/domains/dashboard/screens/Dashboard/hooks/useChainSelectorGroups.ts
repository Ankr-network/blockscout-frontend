import { Chain, ChainType } from 'domains/chains/types';
import { usePrivateChainItem } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { getStatsChainId } from 'domains/chains/screens/ChainItem/components/ChainItemSections/utils/getStatsChainId';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';
import { ChainGroupID } from 'modules/endpoints/types';

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

  const mappedChainId = getStatsChainId({
    publicChain,
    chainType,
    chainSubType,
    group,
    isChainProtocolSwitchEnabled:
      chainProtocolContext.isChainProtocolSwitchEnabled,
    chainProtocol: chainProtocolContext.chainProtocol,
    withExceptions: false,
  });

  return {
    statsChainId: checkPrivateChainsAndGetChainId(mappedChainId),
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
