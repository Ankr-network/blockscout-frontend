import { IChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { useChainProtocol } from 'domains/chains/screens/ChainItem/hooks/useChainProtocol';
import { useCommonChainItem } from 'domains/chains/screens/ChainItem/hooks/useCommonChainItem';
import { useGroup } from 'domains/chains/screens/ChainItem/hooks/useGroup';
import { usePrivateChainType } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainType';
import { getPrivateChainTypeSelector } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/utils';

export const usePrivateChainSelectedContent = ({
  chain,
  unfilteredChain: publicChain,
}: IChainItemDetails) => {
  const { endpoints, netId } = useCommonChainItem({
    chain,
    publicChain,
  });

  const { chainType, selectType } = usePrivateChainType({
    chain,
    endpoints,
    netId,
  });

  const chainTypes = getPrivateChainTypeSelector(endpoints);

  const { group, groups, groupID, selectGroup } = useGroup({
    chain,
    chainType,
    endpoints,
    netId,
  });

  const chainProtocolContext = useChainProtocol({ group, netId });

  return {
    chainProtocolContext,
    chainType,
    chainTypes,
    selectType,
    groups,
    groupID,
    selectGroup,
  };
};
