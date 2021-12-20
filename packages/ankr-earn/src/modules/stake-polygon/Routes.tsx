import loadable from '@loadable/component';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { INDEX_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { generatePath, Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';

// TODO: remove dashboard from this route and all dependend components if we decide not to use it

const ROOT = `${INDEX_PATH}/MATIC`;
const DASHBOARD_PATH = ROOT;
const STAKE_PATH = `${ROOT}/stake`;

const Stake = loadable(
  async () =>
    import('./screens/StakePolygon').then(module => module.StakePolygon),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export const RoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: DASHBOARD_PATH,
      generatePath: () => generatePath(DASHBOARD_PATH),
    },
    stake: {
      path: STAKE_PATH,
      generatePath: () => generatePath(STAKE_PATH),
    },
  },
  ROOT,
);

export function getRoutes() {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route path={DASHBOARD_PATH} exact>
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </Route>

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}
