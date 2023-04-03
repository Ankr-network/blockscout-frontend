import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { useAuth } from '../../hooks/useAuth';
import { getFlattenChain, getMetamaskNetwork } from './AddNetworkUtils';

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
  const { handleAddNetwork, loading } = useAuth();

  const { flatChain, flatChainId } = useMemo(() => {
    if (group && chainType) {
      return getFlattenChain(publicChain, chainType, group);
    }

    return { flatChain: publicChain, flatChainId: publicChain.id };
  }, [publicChain, chainType, group]);

  const metamaskNetwork = useMemo(
    () => getMetamaskNetwork(flatChain!),
    [flatChain],
  );

  const handleButtonClick = metamaskNetwork
    ? (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        /* stop propagation for click event to avoid parent element click */
        event.preventDefault();
        event.stopPropagation();

        return handleAddNetwork(metamaskNetwork, flatChainId);
      }
    : undefined;

  return {
    loading,
    handleButtonClick,
  };
};
