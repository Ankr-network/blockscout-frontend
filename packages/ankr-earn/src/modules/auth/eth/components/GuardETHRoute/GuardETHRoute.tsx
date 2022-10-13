import { RouteProps } from 'react-router';

import { AvailableWriteProviders, EEthereumNetworkId } from 'common';

import { GuardRoute } from 'modules/auth/common/components/GuardRoute';

import { useGuardETHRoute } from './hooks/useGuardETHRoute';

interface IGuardETHRouteProps extends RouteProps {
  availableNetworks: EEthereumNetworkId[];
  isOpenConnectInstantly?: boolean;
  isOpenedConnectModal?: boolean;
  providerId: AvailableWriteProviders;
}

export const GuardETHRoute = ({
  availableNetworks,
  isOpenConnectInstantly,
  isOpenedConnectModal = true,
  providerId,
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
    providerId,
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
      providerId={providerId}
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
