import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { useAuth } from '../../hooks/useAuth';
import { getFlattenChain, getNetworkConfiguration } from './AddNetworkUtils';

interface IUseAddNetworkButtonParams {
  chain: IApiChain;
  chainType?: ChainType;
  group?: EndpointGroup;
}

export const useAddNetworkButton = ({
  chain,
  chainType,
  group,
}: IUseAddNetworkButtonParams) => {
  const { handleAddNetwork, loading } = useAuth();

  const { flatChain, flatChainId } = useMemo(() => {
    if (group && chainType) {
      return getFlattenChain(chain, chainType, group);
    }

    return { flatChain: chain, flatChainId: chain.id };
  }, [chain, chainType, group]);

  const networkConfiguration = useMemo(
    () => getNetworkConfiguration(flatChain!),
    [flatChain],
  );

  const handleButtonClick = networkConfiguration
    ? (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        /* stop propagation for click event to avoid parent element click */
        event.preventDefault();
        event.stopPropagation();

        return handleAddNetwork(networkConfiguration, flatChainId);
      }
    : undefined;

  return {
    loading,
    handleButtonClick,
  };
};
