import loadable from '@loadable/component';
import { generatePath, Redirect, Route, Switch } from 'react-router-dom';

import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { featuresConfig, UNSTAKE_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

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

const Unstake = loadable(
  () =>
    import('./screens/UnstakePolkadot').then(module => module.UnstakePolkadot),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        {featuresConfig.isActivePolkadotUnstaking && (
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
                <GuardRoute
                  exact
                  availableNetworks={availableNetworks}
                  path={path}
                  providerId={POLKADOT_WRITE_PROVIDER_ID}
                >
                  <GuardRoute
                    exact
                    availableNetworks={ETH_NETWORKS}
                    path={path}
                    providerId={ETH_WRITE_PROVIDER_ID}
                  >
                    <DefaultLayout>
                      <Unstake network={network as EPolkadotNetworks} />
                    </DefaultLayout>
                  </GuardRoute>
                </GuardRoute>
              );
            }}
          />
        )}

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}
