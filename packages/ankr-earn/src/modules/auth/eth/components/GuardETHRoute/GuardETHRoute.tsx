import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider-core';
import { RouteProps } from 'react-router';

import { GuardRoute } from 'modules/auth/common/components/GuardRoute';

import { useGuardETHRoute } from './hooks/useGuardETHRoute';

interface IGuardETHRouteProps extends RouteProps {
  availableNetworks: EEthereumNetworkId[];
  isOpenConnectInstantly?: boolean;
  isOpenedConnectModal?: boolean;
}

export const GuardETHRoute = ({
  availableNetworks,
  isOpenConnectInstantly,
  isOpenedConnectModal = true,
  ...routeProps
}: IGuardETHRouteProps): JSX.Element => {
  const {
    currentNetwork,
    isConnected,
    isLoading,
    isOpenedModal,
    isUnsupportedNetwork,
    isValidWallet,
    supportedNetworks,
    walletsGroupTypes,
    onCloseModal,
    onDispatchConnect,
    onOpenModal,
    onSwitchNetwork,
  } = useGuardETHRoute({
    availableNetworks,
    isOpenedConnectModal,
    providerId: AvailableWriteProviders.ethCompatible,
  });

  return (
    <GuardRoute
      availableNetworks={availableNetworks}
      currentNetwork={currentNetwork}
      isConnected={isConnected}
      isLoading={isLoading}
      isOpenConnectInstantly={isOpenConnectInstantly}
      isOpenedModal={isOpenedModal}
      isUnsupportedNetwork={isUnsupportedNetwork}
      isValidWallet={isValidWallet}
      providerId={AvailableWriteProviders.ethCompatible}
      supportedNetworks={supportedNetworks}
      walletsGroupTypes={walletsGroupTypes}
      onCloseModal={onCloseModal}
      onDispatchConnect={onDispatchConnect}
      onOpenModal={onOpenModal}
      onSwitchNetwork={onSwitchNetwork}
      {...routeProps}
    />
  );
};
