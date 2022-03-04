import { Box, Button } from '@material-ui/core';
import { Route, RouteProps } from 'react-router';

import { AvailableWriteProviders } from 'provider';

import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { useAuth } from 'modules/auth/hooks/useAuth';
import {
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  featuresConfig,
} from 'modules/common/const';
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
];

export const ConnectGuardRoute = ({
  ...routeProps
}: IConnectGuardRouteProps): JSX.Element => {
  const { dispatchConnect, isConnected } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  if (isConnected && featuresConfig.multiNetwork) {
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

  if (isConnected) {
    return <Route {...routeProps} />;
  }

  return (
    <DefaultLayout>
      <Box component="section" py={{ xs: 6, md: 8 }}>
        <Container>
          <Placeholder
            btnSlot={
              <Button onClick={dispatchConnect}>
                {t('Connect to a wallet')}
              </Button>
            }
            title={t('Please connect your wallet to continue')}
          />
        </Container>
      </Box>
    </DefaultLayout>
  );
};
