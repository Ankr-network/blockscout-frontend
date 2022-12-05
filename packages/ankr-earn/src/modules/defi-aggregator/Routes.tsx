import { generatePath, Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

import { Nav } from './components';

const ROOT = `${STAKING_PATH}defi/`;
const ROOT_WITH_QUERY_PARAMS = `${ROOT}?assets=:asset`;

export const RoutesConfig = createRouteConfig(
  {
    defi: {
      path: ROOT,
      generatePath: (asset?: string) =>
        asset
          ? generatePath(ROOT_WITH_QUERY_PARAMS, { asset })
          : generatePath(ROOT),
      useParams: () => {
        const result: Record<string, string[]> = {};
        const query = useQueryParams();
        const assets = query.getAll('assets');
        const networks = query.getAll('networks');
        const types = query.getAll('types');

        if (assets.length) {
          result.assets = assets;
        }

        if (networks.length) {
          result.networks = networks;
        }

        if (types.length) {
          result.types = types;
        }

        return result;
      },
    },
  },
  ROOT,
);

const DeFiAggregator = loadComponent(() =>
  import('./screens/DeFiAggregator').then(module => module.DeFiAggregator),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route exact path={RoutesConfig.defi.path}>
          <DefaultLayout bannerSize="xl">
            <DeFiAggregator routesConfig={RoutesConfig}>
              <Nav href={RoutesConfig.defi.path} />
            </DeFiAggregator>
          </DefaultLayout>
        </Route>

        <Route path={RoutesConfig.root}>
          <Redirect to={RoutesConfig.defi.generatePath()} />
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
