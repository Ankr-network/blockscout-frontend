import loadable from '@loadable/component';
import { generatePath, Route, Switch } from 'react-router-dom';
import { INDEX_PATH, isMainnet } from '../common/const';
import { BlockchainNetworkId } from '../common/types';
import { GuardRoute } from '../../components/GuardRoute';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';

const ROOT = `${INDEX_PATH}/MATIC`;
const DASHBOARD_PATH = `${ROOT}`;
const STAKE_PATH = `${ROOT}/stake`;

const Dashboard = loadable(
  async () =>
    import('./screens/StakePolygonDashboard').then(
      module => module.StakePolygonDashboard,
    ),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

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
        <GuardRoute
          path={RoutesConfig.dashboard.path}
          render={() => <Dashboard />}
          availableNetworks={[
            isMainnet
              ? BlockchainNetworkId.mainnet
              : BlockchainNetworkId.goerli,
          ]}
          exact={true}
        />

        <GuardRoute
          path={RoutesConfig.stake.path}
          render={() => <Stake />}
          availableNetworks={[
            isMainnet
              ? BlockchainNetworkId.mainnet
              : BlockchainNetworkId.goerli,
          ]}
          exact={true}
        />
      </Switch>
    </Route>
  );
}
