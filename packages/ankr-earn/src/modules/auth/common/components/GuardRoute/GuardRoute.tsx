import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import { Route, RouteProps } from 'react-router';

import { AvailableWriteProviders } from 'provider';

import { TActionPromise } from 'modules/common/types/ReduxRequests';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Container } from 'uiKit/Container';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { IConnect } from '../../actions/connect';
import { Connect } from '../Connect';
import { ConnectWalletsModal } from '../ConnectWalletsModal';
import { NetworkSelector, NetworkSelectorItem } from '../NetworkSelector';
import { UnsupportedNetwork } from '../UnsupportedNetwork';

import { INetworkItem, TNetworkId } from './types';

interface IGuardRouteProps<
  NetworkId extends TNetworkId,
  SupportedNetworkItem extends INetworkItem<NetworkId>,
> extends RouteProps {
  availableNetworks: NetworkId[];
  currentNetwork: string;
  isConnected: boolean;
  isLoading: boolean;
  isOpenConnectInstantly?: boolean;
  isOpenedModal: boolean;
  isUnsupportedNetwork: boolean;
  isValidWallet: boolean;
  providerId: AvailableWriteProviders;
  supportedNetworks: SupportedNetworkItem[];
  walletsGroupTypes?: AvailableWriteProviders[];
  onCloseModal: () => void;
  onDispatchConnect: () => TActionPromise<IConnect>;
  onOpenModal: () => void;
  onSwitchNetwork: (network: NetworkId) => () => void;
}

export const GuardRoute = <
  NetworkId extends TNetworkId,
  SupportedNetworkItem extends INetworkItem<NetworkId>,
>({
  availableNetworks,
  currentNetwork,
  isConnected,
  isLoading,
  isOpenConnectInstantly,
  isOpenedModal,
  isUnsupportedNetwork,
  isValidWallet,
  providerId,
  supportedNetworks,
  walletsGroupTypes,
  onCloseModal,
  onDispatchConnect,
  onOpenModal,
  onSwitchNetwork,
  ...routeProps
}: IGuardRouteProps<NetworkId, SupportedNetworkItem>): JSX.Element => {
  useEffect(() => {
    if (!isConnected && isOpenConnectInstantly) {
      onDispatchConnect();
    }
  }, [isConnected, isOpenConnectInstantly, onDispatchConnect]);

  if (isUnsupportedNetwork) {
    const renderedNetworkItems = supportedNetworks.map(
      ({ icon, title, chainId: network }) => (
        <NetworkSelectorItem
          key={network}
          disabled={!isValidWallet}
          iconSlot={icon}
          title={title}
          onClick={onSwitchNetwork(network)}
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
