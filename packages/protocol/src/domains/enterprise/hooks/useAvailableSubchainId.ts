import { Chain, ChainSubType, ChainType } from '@ankr.com/chains-list';

import { useAppSelector } from 'store/useAppSelector';
import { EndpointGroup } from 'modules/endpoints/types';
import { getChainId } from 'modules/chains/utils/getChainId';

import { selectEnterpriseBlockchainsDependingOnSelectedApiKey } from '../store/selectors';

interface UseAvailableSubChainIdProps {
  publicChain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
}

export const useAvailableSubChainId = ({
  chainSubType,
  chainType,
  group,
  publicChain,
}: UseAvailableSubChainIdProps) => {
  const subChainsList = useAppSelector(
    selectEnterpriseBlockchainsDependingOnSelectedApiKey,
  );

  const subChainId = getChainId({
    publicChain,
    chainType,
    chainSubType,
    group,
  });

  const isSubChainAvailable = subChainsList.includes(subChainId);

  return {
    isSubChainAvailable,
  };
};
