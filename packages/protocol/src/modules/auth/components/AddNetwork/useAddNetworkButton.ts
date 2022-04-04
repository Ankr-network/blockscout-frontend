import { useAuth } from '../../hooks/useAuth';
import React, { useMemo } from 'react';
import { getMappedNetwork } from './AddNetworkUtils';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';

export const useAddNetworkButton = ({ chain }: { chain: Chain }) => {
  const { handleAddNetwork, isWalletConnected, loading } = useAuth();

  const mappedNetwork = useMemo(() => getMappedNetwork(chain), [chain]);

  const handleButtonClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    /* stop propagation for click event to avoid parent element click */
    event.preventDefault();
    event.stopPropagation();

    return handleAddNetwork(mappedNetwork);
  };

  return {
    isWalletConnected,
    loading,
    mappedNetwork,
    handleButtonClick,
  };
};
