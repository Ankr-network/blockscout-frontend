import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { AvailableWriteProviders } from 'provider';

import { IConnect } from 'modules/auth/actions/connect';
import { switchNetwork } from 'modules/auth/actions/switchNetwork';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { BlockchainNetworkId } from 'modules/common/types';
import { TActionPromise } from 'modules/common/types/ReduxRequests';

import { useNetworks, INetwork } from './useNetworks';

interface IUseGuardRouteArgs {
  availableNetworks: BlockchainNetworkId[];
  providerId: AvailableWriteProviders;
}

interface IUseGuardRouteData {
  isConnected: boolean;
  isUnsupportedNetwork: boolean;
  supportedNetworks: INetwork[];
  chainId?: BlockchainNetworkId;
  isMetaMask: boolean;
  dispatchConnect: () => TActionPromise<IConnect>;
  handleSwitchNetwork: (network: number) => () => void;
}

export const useGuardRoute = ({
  availableNetworks,
  providerId,
}: IUseGuardRouteArgs): IUseGuardRouteData => {
  const { isConnected, dispatchConnect, chainId, isMetaMask } =
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
    (network: number) => () => {
      dispatchRequest(switchNetwork({ providerId, chainId: network }));
    },
    [dispatchRequest, providerId],
  );

  return {
    isConnected,
    isUnsupportedNetwork,
    supportedNetworks,
    chainId,
    isMetaMask,
    dispatchConnect,
    handleSwitchNetwork,
  };
};
