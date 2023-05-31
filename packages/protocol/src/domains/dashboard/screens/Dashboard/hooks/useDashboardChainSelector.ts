import { Chain } from 'domains/chains/types';
import { usePrivateChainItem } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { getStatsChainId } from 'domains/chains/screens/ChainItem/components/ChainItemSections/utils/getStatsChainId';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';

interface IDashboardChainSelector {
  chain: Chain;
  unfilteredChain: Chain;
}

export const useDashboardChainSelector = ({
  chain,
  unfilteredChain,
}: IDashboardChainSelector) => {
  const {
    chainProtocolContext,
    publicChain,
    chainType,
    group,
    groups,
    groupID,
    selectGroup,
    chainTypes,
    selectType,
  } = usePrivateChainItem({
    chain,
    unfilteredChain,
    isChainArchived: false,
  });

  const mappedChainId = getStatsChainId({
    publicChain,
    chainType,
    group,
    isChainProtocolSwitchEnabled:
      chainProtocolContext.isChainProtocolSwitchEnabled,
    chainProtocol: chainProtocolContext.chainProtocol,
  });

  return {
    statsChainId: checkPrivateChainsAndGetChainId(mappedChainId),
    detailsChainId: mappedChainId,
    chainProtocolContext,
    chainType,
    chainTypes,
    selectType,
    group,
    groups,
    groupID,
    selectGroup,
  };
};
