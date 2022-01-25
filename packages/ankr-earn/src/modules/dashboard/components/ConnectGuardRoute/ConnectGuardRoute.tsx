import { Box, Button, Container } from '@material-ui/core';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { t } from 'modules/i18n/utils/intl';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { MATIC_STAKING_NETWORKS, POLYGON_PROVIDER_ID } from 'modules/stake-polygon/const';
import { Route, RouteProps } from 'react-router';
import { Placeholder } from '../Placeholder';

interface IConnectGuardRouteProps extends RouteProps {}

export const ConnectGuardRoute = ({
  ...routeProps
}: IConnectGuardRouteProps) => {
  const { dispatchConnect, isConnected } = useAuth(POLYGON_PROVIDER_ID, MATIC_STAKING_NETWORKS);

  if (isConnected) {
    return <Route {...routeProps} />;
  }

  return (
    <DefaultLayout>
      <Box component="section" py={{ xs: 6, md: 8 }}>
        <Container>
          <Placeholder
            title={t('Please connect your wallet to continue')}
            btnSlot={
              <Button onClick={dispatchConnect}>
                {t('Connect to a wallet')}
              </Button>
            }
          />
        </Container>
      </Box>
    </DefaultLayout>
  );
};
