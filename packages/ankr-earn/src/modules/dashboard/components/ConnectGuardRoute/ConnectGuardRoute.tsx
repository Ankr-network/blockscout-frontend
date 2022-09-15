import { Box, Button } from '@material-ui/core';
import { Route, RouteProps } from 'react-router';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { t } from 'common';

import { ConnectWalletsModal } from 'modules/auth/common/components/ConnectWalletsModal';
import { useWalletsGroupTypes } from 'modules/auth/common/hooks/useWalletsGroupTypes';
import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import {
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  GNO_NETWORK_BY_ENV,
  POLYGON_NETWORK_BY_ENV,
} from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Container } from 'uiKit/Container';

import { Placeholder } from '../Placeholder';

interface IConnectGuardRouteProps extends RouteProps {}

const AVAILABLE_NETWORKS = [
  ETH_NETWORK_BY_ENV,
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  POLYGON_NETWORK_BY_ENV,
  GNO_NETWORK_BY_ENV,
];

export const ConnectGuardRoute = ({
  ...routeProps
}: IConnectGuardRouteProps): JSX.Element => {
  const providerId = AvailableWriteProviders.ethCompatible;

  const { isOpened, onClose, onOpen } = useDialog();

  const { walletsGroupTypes, writeProviderData } = useWalletsGroupTypes({
    writeProviderId: providerId,
  });

  const isConnected = writeProviderData?.isConnected ?? false;

  if (isConnected) {
    return (
      <GuardETHRoute
        exact
        availableNetworks={AVAILABLE_NETWORKS}
        path={routeProps.path}
        providerId={providerId}
      >
        <Route {...routeProps} />
      </GuardETHRoute>
    );
  }

  return (
    <DefaultLayout verticalAlign="center">
      <Box component="section" py={{ xs: 5, md: 8 }}>
        <Container>
          <Placeholder
            btnSlot={
              <Button onClick={onOpen}>
                {t('dashboard.guard.connect-btn')}
              </Button>
            }
            title={t('dashboard.guard.title')}
          />
        </Container>
      </Box>

      <ConnectWalletsModal
        isOpen={isOpened}
        walletsGroupTypes={walletsGroupTypes}
        onClose={onClose}
      />
    </DefaultLayout>
  );
};
