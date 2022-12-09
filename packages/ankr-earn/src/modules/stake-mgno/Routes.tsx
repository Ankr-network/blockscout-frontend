import { generatePath, Route, Switch } from 'react-router';

import { EWalletId } from '@ankr.com/provider';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { STAKING_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

import { MGNO_STAKING_NETWORKS } from './const';
import { UnsupportedOkxWallet } from './screens/UnsupportedOkxWallet';

const ROOT = `${STAKING_PATH}mgno-stake/`;
const STAKE_PATH = `${ROOT}stake/`;
const STAKE_WITH_PROVIDER_PATH = `${STAKE_PATH}?provider=:provider?`;
const STEPS_STAKE_PATH = `${STAKE_PATH}steps/:txHash/`;
const PROVIDERS_PATH = `${ROOT}providers/`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },

    providers: {
      path: PROVIDERS_PATH,
      generatePath: () => generatePath(PROVIDERS_PATH),
    },

    stake: {
      path: STAKE_PATH,
      generatePath: (provider?: string) => {
        return provider
          ? generatePath(STAKE_WITH_PROVIDER_PATH, { provider })
          : generatePath(STAKE_PATH);
      },
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    stakeSteps: {
      path: STEPS_STAKE_PATH,
      generatePath: (options: { txHash: string }) =>
        generatePath(STEPS_STAKE_PATH, options),
    },
  },
  ROOT,
);

const Main = loadComponent(() =>
  import('./screens/Main').then(module => module.Main),
);

const Stake = loadComponent(() =>
  import('./screens/Stake').then(module => module.Stake),
);

const StakeSteps = loadComponent(() =>
  import('./screens/StakeSteps').then(module => module.StakeSteps),
);

const Providers = loadComponent(() =>
  import('./screens/Providers').then(module => module.Providers),
);

export function getRoutes(): JSX.Element {
  const commonGuardProps = {
    exact: true,
    availableNetworks: MGNO_STAKING_NETWORKS,
    supportSlot: <UnsupportedOkxWallet />,
    notSupportedWallets: [EWalletId.okxwallet],
  };

  return (
    <Route path={[RoutesConfig.root]}>
      <Switch>
        <GuardETHRoute {...commonGuardProps} path={RoutesConfig.main.path}>
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute {...commonGuardProps} path={RoutesConfig.providers.path}>
          <DefaultLayout>
            <Providers />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute {...commonGuardProps} path={RoutesConfig.stake.path}>
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          {...commonGuardProps}
          path={RoutesConfig.stakeSteps.path}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>
      </Switch>
    </Route>
  );
}
