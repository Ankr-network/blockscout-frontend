import { Box, Typography } from '@material-ui/core';
import { getRoutes as getBoostRoutes } from 'modules/boost/Routes';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { EMPTY_PATH, INDEX_PATH } from 'modules/common/const';
import { getRoutes as getFeaturesRoutes } from 'modules/features/Routes';
import { getRoutes as getStakeDemoRoutes } from 'modules/stake-demo/Routes';
import { getRoutes as getStakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'uiKit/Container';
import { DefaultLayout } from './modules/layout/components/DefautLayout';

export function Routes() {
  return (
    <Switch>
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

      <Route path={EMPTY_PATH} exact>
        <Redirect to={INDEX_PATH} />
      </Route>

      {getBoostRoutes()}
      {getStakePolygonRoutes()}
      {getFeaturesRoutes()}

      {/* for the demo purpose */}
      {getStakeDemoRoutes()}

      <Route>
        <DefaultLayout>
          <PageNotFound />
        </DefaultLayout>
      </Route>
    </Switch>
  );
}
