import { LoadableComponent } from '@loadable/component';
import { ExtractRouteParams } from 'react-router';
import {
  generatePath,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { GuardPolkadotRoute } from 'modules/auth/polkadot/components/GuardPolkadotRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { featuresConfig, UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import {
  ETH_NETWORKS,
  ETH_WRITE_PROVIDER_ID,
  POLKADOT_WRITE_PROVIDER_ID,
} from './const';
import {
  EPolkadotNetworks,
  IPolkadotRouteLoadableComponentProps,
} from './types';
import { getPolkadotPath } from './utils/getPolkadotPath';
import { getPolkadotStakingNetworks } from './utils/getPolkadotStakingNetworks';

const ROOT = `${StakeRoutes.main.path}:network/`;
const STAKE_POLKADOT_PATH = ROOT;
const UNSTAKE_POLKADOT_PATH = `${UNSTAKE_PATH}:network/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_POLKADOT_PATH,
      generatePath: (network: EPolkadotNetworks) =>
        generatePath(STAKE_POLKADOT_PATH, {
          network: network.toLowerCase(),
        }),
    },
    unstake: {
      path: UNSTAKE_POLKADOT_PATH,
      generatePath: (network: EPolkadotNetworks) =>
        generatePath(UNSTAKE_POLKADOT_PATH, {
          network: network.toLowerCase(),
        }),
    },
  },
  ROOT,
);

const Stake = loadComponent(() =>
  import('./screens/StakePolkadot').then(module => module.StakePolkadot),
);

const Unstake = loadComponent(() =>
  import('./screens/UnstakePolkadot').then(module => module.UnstakePolkadot),
);

const routeRender =
  (
    targetPath: string,
    Component: LoadableComponent<IPolkadotRouteLoadableComponentProps>,
  ) =>
  ({
    match: { params },
  }: RouteComponentProps<ExtractRouteParams<string, string>>): JSX.Element => {
    const currNetwork = params.network;

    const { isValid, network, path } = getPolkadotPath(currNetwork, targetPath);
    const availableNetworks = getPolkadotStakingNetworks(network);

    if (!isValid || availableNetworks === null) {
      return <Redirect to={path} />;
    }

    return (
      <GuardPolkadotRoute
        exact
        availableNetworks={availableNetworks}
        path={path}
        providerId={POLKADOT_WRITE_PROVIDER_ID}
      >
        <GuardETHRoute
          exact
          availableNetworks={ETH_NETWORKS}
          path={path}
          providerId={ETH_WRITE_PROVIDER_ID}
        >
          <DefaultLayout>
            <Component network={network as EPolkadotNetworks} />
          </DefaultLayout>
        </GuardETHRoute>
      </GuardPolkadotRoute>
    );
  };

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        {featuresConfig.isActivePolkadotStaking && (
          <Route
            path={RoutesConfig.root}
            render={routeRender(STAKE_POLKADOT_PATH, Stake)}
          />
        )}

        <Route
          path={RoutesConfig.unstake.path}
          render={routeRender(UNSTAKE_POLKADOT_PATH, Unstake)}
        />

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}
