import {
  INetwork,
  useNetworks,
} from 'modules/auth/components/GuardRoute/useNetworks';
import { BlockchainNetworkId } from 'modules/common/types';
import { useMemo } from 'react';
import { useWeb3WalletData } from '../../hooks/useWeb3WalletData';

interface IUseGuardComponentData {
  filteredNetworks: INetwork[];
  isConnected: boolean;
  isUnsupportedNetwork: boolean;
}

export const useGuardComponent = (
  availableNetworks: BlockchainNetworkId[],
): IUseGuardComponentData => {
  const { chainId, isConnected } = useWeb3WalletData();
  const networks: INetwork[] = useNetworks();

  const isUnsupportedNetwork: boolean = useMemo(
    (): boolean => isConnected && !availableNetworks.includes(chainId),
    [availableNetworks, chainId, isConnected],
  );

  const filteredNetworks: INetwork[] = useMemo(
    (): INetwork[] =>
      networks.filter((network: INetwork): boolean =>
        availableNetworks.includes(network.chainId),
      ),
    [availableNetworks, networks],
  );

  return {
    filteredNetworks,
    isConnected,
    isUnsupportedNetwork,
  };
};
