import { generatePath, Route, Switch } from 'react-router';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { STAKING_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/polkadot-slot-auction/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

import { MGNO_PROVIDER_ID, MGNO_STAKING_NETWORKS } from './const';
import { Main } from './screens/Main';

const ROOT = `${STAKING_PATH}mgno-stake/`;
const STAKE_PATH = `${ROOT}stake/`;
const STAKE_WITH_PROVIDER_PATH = `${STAKE_PATH}?provider=:provider?`;
const STEPS_STAKE_PATH = `${STAKE_PATH}steps/:txHash/`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
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

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={MGNO_STAKING_NETWORKS}
          path={RoutesConfig.main.path}
          providerId={MGNO_PROVIDER_ID}
        >
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MGNO_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={MGNO_PROVIDER_ID}
        >
          <DefaultLayout>{/* <Stake /> */}</DefaultLayout>
        </GuardETHRoute>
      </Switch>
    </Route>
  );
}
