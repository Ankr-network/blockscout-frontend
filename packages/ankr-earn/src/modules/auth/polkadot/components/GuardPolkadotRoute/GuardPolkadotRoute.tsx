import { RouteProps } from 'react-router';

import { AvailableWriteProviders, EPolkadotNetworkId } from 'provider';

import { GuardRoute } from 'modules/auth/common/components/GuardRoute';

import { useGuardPolkadotRoute } from './hooks/useGuardPolkadotRoute';

interface IGuardPolkadotRouteProps extends RouteProps {
  availableNetworks: EPolkadotNetworkId[];
  isOpenConnectInstantly?: boolean;
  providerId: AvailableWriteProviders;
}

export const GuardPolkadotRoute = ({
  availableNetworks,
  isOpenConnectInstantly,
  providerId,
  ...routeProps
}: IGuardPolkadotRouteProps): JSX.Element => {
  const {
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
  } = useGuardPolkadotRoute({
    availableNetworks,
    providerId,
  });

  return (
    <GuardRoute
      availableNetworks={availableNetworks}
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
