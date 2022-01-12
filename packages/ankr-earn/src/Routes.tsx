import { Box, Container, Typography } from '@material-ui/core';
import { getRoutes as getBoostRoutes } from 'modules/boost/Routes';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { EMPTY_PATH, INDEX_PATH } from 'modules/common/const';
import { getRoutes as getDashboardRoutes } from 'modules/dashboard/Routes';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { getRoutes as getPolkadotSlotAuctionRoutes } from 'modules/polkadot-slot-auction/Routes';
import { getRoutes as getStakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { getRoutes as getStakeRoutes } from 'modules/stake/Routes';
import { Redirect, Route, Switch } from 'react-router-dom';

export function Routes() {
  return (
    <Switch>
      <Route path={EMPTY_PATH} exact>
        <Redirect to={INDEX_PATH} />
      </Route>

      {/* todo: move it to the dedicated module */}
      <Route path={INDEX_PATH} exact>
        <DefaultLayout>
          <Box textAlign="center" py={6}>
            <Container>
              <Typography variant="h3">🏠</Typography>
            </Container>
          </Box>
        </DefaultLayout>
      </Route>

      {getBoostRoutes()}
      {getStakeRoutes()}
      {getStakePolygonRoutes()}
      {getDashboardRoutes()}
      {getPolkadotSlotAuctionRoutes()}

      <Route>
        <DefaultLayout>
          <PageNotFound />
        </DefaultLayout>
      </Route>
    </Switch>
  );
}
