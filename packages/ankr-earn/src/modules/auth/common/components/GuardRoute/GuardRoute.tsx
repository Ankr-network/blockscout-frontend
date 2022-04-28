import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import { Route, RouteProps } from 'react-router';

import { AvailableWriteProviders } from 'provider';

import { Connect } from 'modules/auth/common/components/Connect';
import { BlockchainNetworkId } from 'modules/common/types';
import { t } from 'modules/i18n/utils/intl';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Container } from 'uiKit/Container';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { ConnectWalletsModal } from '../ConnectWalletsModal';
import { NetworkSelector, NetworkSelectorItem } from '../NetworkSelector';
import { UnsupportedNetwork } from '../UnsupportedNetwork';

import { useGuardRoute } from './useGuardRoute';
import { useKnownNetworks } from './useKnownNetworks';

interface IGuardRouteProps extends RouteProps {
  providerId: AvailableWriteProviders;
  openConnectInstantly?: boolean;
  availableNetworks: BlockchainNetworkId[];
}

export const GuardRoute = ({
  providerId,
  availableNetworks,
  openConnectInstantly,
  ...routeProps
}: IGuardRouteProps): JSX.Element => {
  const {
    isConnected,
    isLoading,
    isOpenedModal,
    isUnsupportedNetwork,
    supportedNetworks,
    chainId,
    isValidWallet,
    dispatchConnect,
    handleSwitchNetwork,
    walletsGroupTypes,
    onCloseModal,
    onOpenModal,
  } = useGuardRoute({
    providerId,
    availableNetworks,
  });

  const knownNetworks = useKnownNetworks();

  useEffect(() => {
    if (!isConnected && openConnectInstantly) dispatchConnect();
  }, [openConnectInstantly, isConnected, dispatchConnect]);

  if (isUnsupportedNetwork) {
    const currentNetwork =
      typeof chainId === 'number' && knownNetworks[chainId]
        ? knownNetworks[chainId]
        : t('connect.current');

    const renderedNetworkItems = supportedNetworks.map(
      ({ icon, title, chainId: network }) => (
        <NetworkSelectorItem
          key={network}
          disabled={!isValidWallet}
          iconSlot={icon}
          title={title}
          onClick={handleSwitchNetwork(network)}
        />
      ),
    );

    return (
      <DefaultLayout verticalAlign="center">
        <Box component="section" py={{ xs: 5, md: 8 }}>
          <Container maxWidth="640px">
            <UnsupportedNetwork
              currentNetwork={currentNetwork}
              networksSlot={
                <NetworkSelector>
                  {isLoading ? <QueryLoadingCentered /> : renderedNetworkItems}
                </NetworkSelector>
              }
            />
          </Container>
        </Box>
      </DefaultLayout>
    );
  }

  if (isConnected) {
    return <Route {...routeProps} />;
  }

  return (
    <DefaultLayout verticalAlign="center">
      <Box component="section" py={{ xs: 5, md: 8 }}>
        <Connect
          networksSlot={
            <NetworkSelector>
              {supportedNetworks.map(({ icon, title, chainId: network }) => (
                <NetworkSelectorItem
                  key={network}
                  disabled
                  iconSlot={icon}
                  title={title}
                />
              ))}
            </NetworkSelector>
          }
          onConnectClick={onOpenModal}
        />
      </Box>

      <ConnectWalletsModal
        isOpen={isOpenedModal}
        walletsGroupTypes={walletsGroupTypes}
        onClose={onCloseModal}
      />
    </DefaultLayout>
  );
};
