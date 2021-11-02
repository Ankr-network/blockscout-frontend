import { useAuth } from '../../hooks/useAuth';
import { useMemo } from 'react';
import { getMappedNetwork } from './AddNetworkUtils';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';

export const useAddNetworkButton = ({ chain }: { chain: Chain }) => {
  const { handleAddNetwork, isWalletConnected, handleConnect } = useAuth();
  const mappedNetwork = useMemo(() => getMappedNetwork(chain), [chain]);

  const handleButtonClick = () => {
    if (isWalletConnected) {
      return handleAddNetwork(mappedNetwork);
    }

    return handleConnect();
  };

  return {
    mappedNetwork,
    handleButtonClick,
  };
};
