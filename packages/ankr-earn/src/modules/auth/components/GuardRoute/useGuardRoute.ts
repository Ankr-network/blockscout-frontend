import { useDispatchRequest } from '@redux-requests/react';
import { switchNetwork } from 'modules/auth/actions/switchNetwork';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { BlockchainNetworkId } from 'modules/common/types';
import { AvailableProviders } from 'provider/providerManager/types';
import { useCallback } from 'react';
import { useNetworks } from './useNetworks';

interface IUseGuardRouteArgs {
  availableNetworks: BlockchainNetworkId[];
  providerId: AvailableProviders;
}

export const useGuardRoute = ({
  availableNetworks,
  providerId,
}: IUseGuardRouteArgs) => {
  const { isConnected, dispatchConnect, chainId, walletName } =
    useAuth(providerId);
  const networks = useNetworks();
  const dispatchRequest = useDispatchRequest();

  const isUnsupportedNetwork =
    isConnected &&
    chainId !== undefined &&
    !availableNetworks.includes(chainId);

  const supportedNetworks = networks.filter(network =>
    availableNetworks.includes(network.chainId),
  );

  const handleSwitchNetwork = useCallback(
    (chainId: number) => () => {
      dispatchRequest(switchNetwork({ providerId, chainId }));
    },
    [dispatchRequest, providerId],
  );

  return {
    isConnected,
    isUnsupportedNetwork,
    supportedNetworks,
    chainId,
    dispatchConnect,
    handleSwitchNetwork,
    walletName,
  };
};
