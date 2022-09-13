import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { getChainById } from 'domains/chains/screens/ChainItem/components/Endpoint/EndpointUtils';
import { getChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/utils/getChainId';
import { ChainType } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { useAuth } from '../../hooks/useAuth';
import { flattenAllChainTypes, getMappedNetwork } from './AddNetworkUtils';

interface IUseAddNetworkButtonParams {
  publicChain: IApiChain;
  chainType?: ChainType;
  group?: EndpointGroup;
}

export const useAddNetworkButton = ({
  publicChain,
  chainType,
  group,
}: IUseAddNetworkButtonParams) => {
  const { handleAddNetwork, isWalletConnected, loading } = useAuth();

  const mappedNetwork = useMemo(() => {
    if (chainType && group) {
      const flatChainId = getChainId({
        publicChain,
        chainType,
        group,
        withExceptions: false,
      }) as ChainID;

      const flatChains = flattenAllChainTypes(publicChain);

      const flatChain = getChainById(flatChains, flatChainId);

      return getMappedNetwork(flatChain, flatChainId);
    }

    return getMappedNetwork(publicChain, publicChain.id as ChainID);
  }, [publicChain, chainType, group]);

  const handleButtonClick = mappedNetwork
    ? (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        /* stop propagation for click event to avoid parent element click */
        event.preventDefault();
        event.stopPropagation();

        return handleAddNetwork(mappedNetwork);
      }
    : undefined;

  return {
    isWalletConnected,
    loading,
    handleButtonClick,
  };
};
