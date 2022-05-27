import { generatePath, Route, Switch, useParams } from 'react-router-dom';

import { TEthToken } from 'modules/api/EthSDK';
import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH, featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { ETH_PROVIDER_ID, ETH_STAKING_NETWORKS } from './const';

const ROOT = `${StakeRoutes.main.path}ethereum/`;
const STAKE_ETH_PATH = `${ROOT}?token=:token?`;
const STEP_STAKE_ETH_PATH = `${ROOT}:tokenOut/:txHash/`;
const CLAIM_ETH_ROOT_PATH = `${STAKING_PATH}claim/ethereum/`;
const STEP_CLAIM_ETH_PATH = `${CLAIM_ETH_ROOT_PATH}:tokenOut/:txHash/`;
const STEP_CLAIM_ETH_WITH_AMOUNT_PATH = `${STEP_CLAIM_ETH_PATH}?amount=:amount?`;
const TEST_STAKE_PATH = `${ROOT}without-claim/`;

interface IClaimStepsGeneratePathArgs {
  amount?: string;
  tokenOut?: string;
  txHash?: string;
}

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
      generatePath: (token?: TEthToken) => {
        return token
          ? generatePath(STAKE_ETH_PATH, { token })
          : generatePath(ROOT);
      },
      useParams: () => {
        const queryToken = useQueryParams().get('token');
        const isValidToken =
          queryToken === Token.aETHb || queryToken === Token.aETHc;

        return {
          token: isValidToken ? (queryToken as TEthToken) : undefined,
        };
      },
    },

    stakeWithoutClaim: {
      path: TEST_STAKE_PATH,
      generatePath: () => generatePath(TEST_STAKE_PATH),
    },

    stakeSteps: {
      path: STEP_STAKE_ETH_PATH,
      generatePath: () => generatePath(STEP_STAKE_ETH_PATH),
    },

    claim: {
      path: CLAIM_ETH_ROOT_PATH,
      generatePath: () => generatePath(CLAIM_ETH_ROOT_PATH),
    },

    claimSteps: {
      path: STEP_CLAIM_ETH_PATH,
      generatePath: (props: IClaimStepsGeneratePathArgs | undefined) => {
        return props?.amount
          ? generatePath(STEP_CLAIM_ETH_WITH_AMOUNT_PATH, { ...props })
          : generatePath(STEP_CLAIM_ETH_PATH, { ...props });
      },
      useParams: () => {
        const amount = useQueryParams().get('amount');
        const params = useParams<{ tokenOut: string; txHash: string }>();

        return { ...params, amount: amount ?? undefined };
      },
    },
  },
  ROOT,
);

const Stake = loadComponent(() =>
  import('./screens/StakeEthereum').then(module => module.StakeEthereum),
);

const StakeSteps = loadComponent(() =>
  import('./screens/StakeEthereumSteps').then(
    module => module.StakeEthereumSteps,
  ),
);

const Claim = loadComponent(() =>
  import('./screens/ClaimEthereum').then(module => module.ClaimEthereum),
);

const ClaimSteps = loadComponent(() =>
  import('./screens/ClaimEthereumSteps').then(
    module => module.ClaimEthereumSteps,
  ),
);

const TestingStake = loadComponent(() =>
  import('./screens/StakeWithoutClaim').then(
    module => module.StakeWithoutClaim,
  ),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.claim.path]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={ETH_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.stakeSteps.path}
          providerId={ETH_PROVIDER_ID}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.claim.path}
          providerId={ETH_PROVIDER_ID}
        >
          <DefaultLayout>
            <Claim />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.claimSteps.path}
          providerId={ETH_PROVIDER_ID}
        >
          <DefaultLayout>
            <ClaimSteps />
          </DefaultLayout>
        </GuardETHRoute>

        {featuresConfig.stakeETHWithoutClaim && (
          <GuardETHRoute
            exact
            availableNetworks={ETH_STAKING_NETWORKS}
            path={RoutesConfig.stakeWithoutClaim.path}
            providerId={ETH_PROVIDER_ID}
          >
            <DefaultLayout>
              <TestingStake />
            </DefaultLayout>
          </GuardETHRoute>
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
