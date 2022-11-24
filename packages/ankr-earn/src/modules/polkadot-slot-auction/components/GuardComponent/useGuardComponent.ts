import { useMemo } from 'react';

import {
  IETHNetwork,
  useETHNetworks,
} from 'modules/auth/eth/hooks/useETHNetworks';
import { EEthereumNetworkId } from 'modules/common/types';

import { useWeb3WalletData } from '../../hooks/useWeb3WalletData';

interface IUseGuardComponentData {
  filteredNetworks: IETHNetwork[];
  isConnected: boolean;
  isUnsupportedNetwork: boolean;
}

export const useGuardComponent = (
  availableNetworks: EEthereumNetworkId[],
): IUseGuardComponentData => {
  const { chainId, isConnected } = useWeb3WalletData();
  const { networks } = useETHNetworks();

  const isUnsupportedNetwork = useMemo(
    () => isConnected && !availableNetworks.includes(chainId),
    [availableNetworks, chainId, isConnected],
  );

  const filteredNetworks = useMemo(
    () =>
      networks.filter(network => availableNetworks.includes(network.chainId)),
    [availableNetworks, networks],
  );

  return {
    filteredNetworks,
    isConnected,
    isUnsupportedNetwork,
  };
};
