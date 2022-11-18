import { RouteProps } from 'react-router';

import { EPolkadotNetworkId } from 'polkadot';

import { GuardRoute } from 'modules/auth/common/components/GuardRoute';

import { ExtraWriteProviders } from '../../../../common/types';

import { useGuardPolkadotRoute } from './hooks/useGuardPolkadotRoute';

interface IGuardPolkadotRouteProps extends RouteProps {
  availableNetworks: EPolkadotNetworkId[];
  isOpenConnectInstantly?: boolean;
  isOpenedConnectModal?: boolean;
}

export const GuardPolkadotRoute = ({
  availableNetworks,
  isOpenConnectInstantly,
  isOpenedConnectModal = true,
  ...routeProps
}: IGuardPolkadotRouteProps): JSX.Element => {
  const {
    isConnected,
    isLoading,
    isUnsupportedNetwork,
    isValidWallet,
    supportedNetworks,
    onDispatchConnect,
    onOpenModal,
    onSwitchNetwork,
  } = useGuardPolkadotRoute({
    availableNetworks,
    isOpenedConnectModal,
  });

  return (
    <GuardRoute
      availableNetworks={availableNetworks}
      isConnected={isConnected}
      isLoading={isLoading}
      isOpenConnectInstantly={isOpenConnectInstantly}
      isUnsupportedNetwork={isUnsupportedNetwork}
      isValidWallet={isValidWallet}
      providerId={ExtraWriteProviders.polkadotCompatible}
      supportedNetworks={supportedNetworks}
      onDispatchConnect={onDispatchConnect}
      onOpenModal={onOpenModal}
      onSwitchNetwork={onSwitchNetwork}
      {...routeProps}
    />
  );
};
