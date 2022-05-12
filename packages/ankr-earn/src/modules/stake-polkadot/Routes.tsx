import { generatePath, Redirect, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { GuardPolkadotRoute } from 'modules/auth/polkadot/components/GuardPolkadotRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import {
  ETH_NETWORKS,
  ETH_WRITE_PROVIDER_ID,
  POLKADOT_WRITE_PROVIDER_ID,
} from './const';
import { EPolkadotNetworks } from './types';
import { getPolkadotPath } from './utils/getPolkadotPath';
import { getPolkadotStakingNetworks } from './utils/getPolkadotStakingNetworks';

const ROOT = `${StakeRoutes.main.path}:network/`;
const UNSTAKE_POLKADOT_PATH = `${UNSTAKE_PATH}:network/`;

export const RoutesConfig = createRouteConfig(
  {
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

const Unstake = loadComponent(() =>
  import('./screens/UnstakePolkadot').then(module => module.UnstakePolkadot),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <Route
          render={(props): JSX.Element => {
            const currNetwork = props.match.params.network;

            const { isValid, network, path } = getPolkadotPath(
              currNetwork,
              UNSTAKE_POLKADOT_PATH,
            );
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
                    <Unstake network={network as EPolkadotNetworks} />
                  </DefaultLayout>
                </GuardETHRoute>
              </GuardPolkadotRoute>
            );
          }}
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
