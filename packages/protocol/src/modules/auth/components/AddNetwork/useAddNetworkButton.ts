import { useAuth } from '../../hooks/useAuth';
import React, { useMemo } from 'react';
import { getMappedNetwork } from './AddNetworkUtils';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';

export const useAddNetworkButton = ({ chain }: { chain: Chain }) => {
  const { handleAddNetwork, isWalletConnected, handleConnect, loading } =
    useAuth();
  const mappedNetwork = useMemo(() => getMappedNetwork(chain), [chain]);

  const handleButtonClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    /* stop propagation for click event to avoid parent element click */
    event.stopPropagation();
    if (isWalletConnected) {
      return handleAddNetwork(mappedNetwork);
    }

    return handleConnect();
  };

  return {
    isWalletConnected,
    loading,
    mappedNetwork,
    handleButtonClick,
  };
};
