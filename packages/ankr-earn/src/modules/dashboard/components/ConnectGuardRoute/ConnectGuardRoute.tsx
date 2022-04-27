import { Box, Button } from '@material-ui/core';
import { Route, RouteProps } from 'react-router';

import { AvailableWriteProviders } from 'provider';

import { ConnectWalletsModal } from 'modules/auth/common/components/ConnectWalletsModal';
import { GuardRoute } from 'modules/auth/common/components/GuardRoute';
import { useWalletsGroupTypes } from 'modules/auth/common/hooks/useWalletsGroupTypes';
import {
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  POLYGON_NETWORK_BY_ENV,
} from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { t } from 'modules/i18n/utils/intl';
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
];

export const ConnectGuardRoute = ({
  ...routeProps
}: IConnectGuardRouteProps): JSX.Element => {
  const {
    isOpened: isOpenedModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDialog();

  let isConnected = false;

  const { walletsGroupTypes } = useWalletsGroupTypes({
    postProcessingFn: (providerKey): void => {
      if (providerKey === AvailableWriteProviders.ethCompatible) {
        isConnected = true;
      }
    },
  });

  if (isConnected) {
    return (
      <GuardRoute
        exact
        availableNetworks={AVAILABLE_NETWORKS}
        path={routeProps.path}
        providerId={AvailableWriteProviders.ethCompatible}
      >
        <Route {...routeProps} />
      </GuardRoute>
    );
  }

  return (
    <DefaultLayout>
      <Box component="section" py={{ xs: 6, md: 8 }}>
        <Container>
          <Placeholder
            btnSlot={
              <Button onClick={onOpenModal}>
                {t('dashboard.guard.connect-btn')}
              </Button>
            }
            title={t('dashboard.guard.title')}
          />
        </Container>
      </Box>

      <ConnectWalletsModal
        isOpen={isOpenedModal}
        walletsGroupTypes={walletsGroupTypes}
        onClose={onCloseModal}
      />
    </DefaultLayout>
  );
};
