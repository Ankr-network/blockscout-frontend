import loadable from '@loadable/component';
import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { featuresConfig, UNSTAKE_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { generatePath, Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';
import { BINANCE_WRITE_PROVIDER_ID, BNB_STAKING_NETWORKS } from './const';

const ROOT = `${StakeRoutes.main.path}bnb/`;
const STAKE_BNB_PATH = ROOT;
const UNSTAKE_BNB_PATH = `${UNSTAKE_PATH}bnb/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_BNB_PATH,
      generatePath: () => generatePath(STAKE_BNB_PATH),
    },
    unstake: {
      path: UNSTAKE_BNB_PATH,
      generatePath: () => generatePath(UNSTAKE_BNB_PATH),
    },
  },
  ROOT,
);

const Stake = loadable(
  () => import('./screens/StakeBinance').then(module => module.StakeBinance),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const Unstake = loadable(
  () =>
    import('./screens/UnstakeBinance').then(module => module.UnstakeBinance),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function getRoutes() {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardRoute
          providerId={BINANCE_WRITE_PROVIDER_ID}
          path={RoutesConfig.stake.path}
          availableNetworks={BNB_STAKING_NETWORKS}
          exact
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardRoute>

        {featuresConfig.isActiveBNBUnstaking && (
          <GuardRoute
            providerId={BINANCE_WRITE_PROVIDER_ID}
            path={RoutesConfig.unstake.path}
            availableNetworks={BNB_STAKING_NETWORKS}
            exact
          >
            <DefaultLayout>
              <Unstake />
            </DefaultLayout>
          </GuardRoute>
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
