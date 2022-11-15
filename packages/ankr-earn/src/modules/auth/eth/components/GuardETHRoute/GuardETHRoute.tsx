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
    isUnsupportedNetwork,
    isValidWallet,
    supportedNetworks,
    onDispatchConnect,
    onOpenModal,
    onSwitchNetwork,
  } = useGuardETHRoute({
    availableNetworks,
    isOpenedConnectModal,
  });

  return (
    <GuardRoute
      availableNetworks={availableNetworks}
      currentNetwork={currentNetwork}
      isConnected={isConnected}
      isLoading={isLoading}
      isOpenConnectInstantly={isOpenConnectInstantly}
      isUnsupportedNetwork={isUnsupportedNetwork}
      isValidWallet={isValidWallet}
      providerId={AvailableWriteProviders.ethCompatible}
      supportedNetworks={supportedNetworks}
      onDispatchConnect={onDispatchConnect}
      onOpenModal={onOpenModal}
      onSwitchNetwork={onSwitchNetwork}
      {...routeProps}
    />
  );
};
