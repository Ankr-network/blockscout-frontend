import { LoadableComponent } from '@loadable/component';
import { ExtractRouteParams } from 'react-router';
import {
  generatePath,
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
  POLKADOT_NETWORK_KEYS,
  POLKADOT_WRITE_PROVIDER_ID,
} from './const';
import {
  EPolkadotNetworks,
  IPolkadotRouteLoadableComponentProps,
} from './types';
import { getPolkadotPath } from './utils/getPolkadotPath';
import { getPolkadotStakingNetworks } from './utils/getPolkadotStakingNetworks';

const CLAIM_POLKADOT_PATH = `/claim/:network/`;
const STAKE_POLKADOT_PATH = `${StakeRoutes.main.path}:network/`;
const UNSTAKE_POLKADOT_PATH = `${UNSTAKE_PATH}:network/`;

const CLAIM_POLKADOT_PATHS = POLKADOT_NETWORK_KEYS.map(network =>
  CLAIM_POLKADOT_PATH.replace(':network', network.toLowerCase()),
);

const STAKE_POLKADOT_PATHS = POLKADOT_NETWORK_KEYS.map(network =>
  STAKE_POLKADOT_PATH.replace(':network', network.toLowerCase()),
);

const UNSTAKE_POLKADOT_PATHS = POLKADOT_NETWORK_KEYS.map(network =>
  UNSTAKE_POLKADOT_PATH.replace(':network', network.toLowerCase()),
);

export const RoutesConfig = createRouteConfig(
  {
    claim: {
      generatePath: (network: EPolkadotNetworks) =>
        generatePath(CLAIM_POLKADOT_PATH, {
          network: network.toLowerCase(),
        }),
    },
    stake: {
      generatePath: (network: EPolkadotNetworks) =>
        generatePath(STAKE_POLKADOT_PATH, {
          network: network.toLowerCase(),
        }),
    },
    unstake: {
      generatePath: (network: EPolkadotNetworks) =>
        generatePath(UNSTAKE_POLKADOT_PATH, {
          network: network.toLowerCase(),
        }),
    },
  },
  // Note: Potential issue. Please don't use "RoutesConfig.root" from this constant and this is pointless in our cases
  STAKE_POLKADOT_PATH,
);

const Claim = loadComponent(() =>
  import('./screens/ClaimPolkadot').then(module => module.ClaimPolkadot),
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
    location: { pathname },
  }: RouteComponentProps<ExtractRouteParams<string, string>>): JSX.Element => {
    const isMultiSlashes = pathname.includes('//');
    const pathNames = pathname.split('/').filter(path => path !== '');
    const currNetwork = pathNames[pathNames.length - 1];

    const { isValid, network, path } = getPolkadotPath(currNetwork, targetPath);
    const availableNetworks = getPolkadotStakingNetworks(network);

    if (isMultiSlashes || !isValid || availableNetworks === null) {
      return (
        <DefaultLayout>
          <PageNotFound />
        </DefaultLayout>
      );
    }

    return (
      <GuardPolkadotRoute
        exact
        availableNetworks={availableNetworks}
        path={path as string}
        providerId={POLKADOT_WRITE_PROVIDER_ID}
      >
        <GuardETHRoute
          exact
          availableNetworks={ETH_NETWORKS}
          path={path as string}
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
    <Route
      path={[
        ...CLAIM_POLKADOT_PATHS,
        ...STAKE_POLKADOT_PATHS,
        ...UNSTAKE_POLKADOT_PATHS,
      ]}
    >
      <Switch>
        {featuresConfig.isActivePolkadotStaking &&
          featuresConfig.isActivePolkadotClaiming && (
            <Route
              path={CLAIM_POLKADOT_PATHS}
              render={routeRender(CLAIM_POLKADOT_PATH, Claim)}
            />
          )}

        {featuresConfig.isActivePolkadotStaking && (
          <Route
            path={STAKE_POLKADOT_PATHS}
            render={routeRender(STAKE_POLKADOT_PATH, Stake)}
          />
        )}

        <Route
          path={UNSTAKE_POLKADOT_PATHS}
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
