import { EndpointGroup } from 'modules/endpoints/types';
import { useChainRequests } from 'domains/projects/screens/Project/components/ProjectChainDetails/hooks/useChainRequests';
import { Chain, ChainSubType, ChainType } from 'modules/chains/types';
import { getStatsChainId } from 'domains/chains/screens/ChainItem/components/ChainItemSections/utils/getStatsChainId';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';
import { ChainProtocolContextValue } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';

interface UseRequestsStringParams {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  chainProtocolContext: ChainProtocolContextValue;
  isChainRequestStatsVisible?: boolean;
}

export const useRequestsString = ({
  chain,
  chainType,
  chainSubType,
  group,
  chainProtocolContext: { chainProtocol, isChainProtocolSwitchEnabled },
  isChainRequestStatsVisible,
}: UseRequestsStringParams) => {
  const subChainId = getStatsChainId({
    publicChain: chain,
    chainType,
    chainSubType,
    group,
    chainProtocol,
    isChainProtocolSwitchEnabled,
  });

  const { requestsString } = useChainRequests(
    checkPrivateChainsAndGetChainId(subChainId),
  );

  return {
    requestsString: isChainRequestStatsVisible ? requestsString : undefined,
  };
};
