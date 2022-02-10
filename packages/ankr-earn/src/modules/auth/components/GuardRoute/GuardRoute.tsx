import { Box } from '@material-ui/core';
import { Connect } from 'modules/auth/components/Connect';
import { BlockchainNetworkId } from 'modules/common/types';
import { t } from 'modules/i18n/utils/intl';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { AvailableWriteProviders } from 'provider/providerManager/types';
import { useEffect } from 'react';
import { Route, RouteProps } from 'react-router';
import { Container } from 'uiKit/Container';
import { NetworkSelector, NetworkSelectorItem } from '../NetworkSelector';
import { UnsupportedNetwork } from '../UnsupportedNetwork';
import { useGuardRoute } from './useGuardRoute';
import { useKnownNetworks } from './useKnownNetworks';

const METAMASK_WALLET_NAME = 'MetaMask';

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
}: IGuardRouteProps) => {
  const {
    isConnected,
    isUnsupportedNetwork,
    supportedNetworks,
    chainId,
    dispatchConnect,
    handleSwitchNetwork,
    walletName,
  } = useGuardRoute({
    providerId,
    availableNetworks,
  });

  const knownNetworks = useKnownNetworks();

  useEffect(() => {
    if (!isConnected && openConnectInstantly) dispatchConnect();
  }, [openConnectInstantly, isConnected, dispatchConnect]);

  if (isUnsupportedNetwork) {
    const isMetamask = walletName === METAMASK_WALLET_NAME;

    const currentNetwork =
      chainId && knownNetworks[chainId]
        ? knownNetworks[chainId]
        : t('connect.current');

    const renderedNetworkItems = supportedNetworks.map(
      ({ icon, title, chainId }) => (
        <NetworkSelectorItem
          key={chainId}
          iconSlot={icon}
          title={title}
          onClick={handleSwitchNetwork(chainId)}
          disabled={!isMetamask}
        />
      ),
    );

    return (
      <DefaultLayout verticalAlign="center">
        <Box component="section" py={{ xs: 5, md: 8 }}>
          <Container maxWidth="640px">
            <UnsupportedNetwork
              networksSlot={
                <NetworkSelector>{renderedNetworkItems}</NetworkSelector>
              }
              currentNetwork={currentNetwork}
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
          onConnectClick={dispatchConnect}
          networksSlot={
            <NetworkSelector>
              {supportedNetworks.map(({ icon, title, chainId }) => (
                <NetworkSelectorItem
                  key={chainId}
                  iconSlot={icon}
                  title={title}
                  disabled
                />
              ))}
            </NetworkSelector>
          }
        />
      </Box>
    </DefaultLayout>
  );
};
