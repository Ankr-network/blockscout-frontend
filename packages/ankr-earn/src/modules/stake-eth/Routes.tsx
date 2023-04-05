import { generatePath, Route, Switch, useParams } from 'react-router-dom';

import { TEthToken } from '@ankr.com/staking-sdk';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import {
  featuresConfig,
  STAKING_PATH,
  UNSTAKE_PATH,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { ETH_STAKING_NETWORKS } from './const';

const ROOT = `${StakeRoutes.main.path}ethereum/`;
const STAKE_ETH_PATH = `${ROOT}?from=:from?`;
const STEP_STAKE_ETH_PATH = `${ROOT}:tokenOut/:txHash/`;
const CLAIM_ETH_ROOT_PATH = `${STAKING_PATH}claim/ethereum/`;
const STEP_CLAIM_ETH_PATH = `${CLAIM_ETH_ROOT_PATH}:tokenOut/:txHash/`;
const STEP_CLAIM_ETH_WITH_AMOUNT_PATH = `${STEP_CLAIM_ETH_PATH}?amount=:amount?`;
const TEST_STAKE_PATH = `${ROOT}without-claim/`;
const UNSTAKE_ETH_PATH = `${UNSTAKE_PATH}ethereum/`;
const UNSTAKE_ETH_BY_TOKEN_PATH = `${UNSTAKE_ETH_PATH}?token=:token?`;
const UNSTAKE_ETH_STEP_PATH = `${UNSTAKE_ETH_PATH}status/`;
const UNSTAKE_ETH_STEP_PATH_WITH_PARAMS = `${UNSTAKE_ETH_STEP_PATH}?txHash=:txHash&token=:token&amount=:amount`;

interface IClaimStepsGeneratePathArgs {
  amount?: string;
  tokenOut?: string;
  txHash?: string;
}

interface IUnstakeStepPathParams {
  txHash: string;
  token: string;
  amount: string;
}

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
      generatePath: (isFromBond?: boolean) => {
        return isFromBond
          ? generatePath(STAKE_ETH_PATH, { from: 'bond' })
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
      generatePath: (options: { txHash: string; tokenOut: TEthToken }) =>
        generatePath(STEP_STAKE_ETH_PATH, options),
    },

    unstake: {
      path: UNSTAKE_ETH_PATH,
      generatePath: (token?: TEthToken) => {
        return token
          ? generatePath(UNSTAKE_ETH_BY_TOKEN_PATH, { token })
          : generatePath(UNSTAKE_ETH_PATH);
      },
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },

    unstakeSteps: {
      path: UNSTAKE_ETH_STEP_PATH,
      generatePath: (options: IUnstakeStepPathParams) =>
        generatePath(
          UNSTAKE_ETH_STEP_PATH_WITH_PARAMS,
          options as unknown as Record<string, string>,
        ),

      useParams: (): Partial<IUnstakeStepPathParams> => {
        const queryParams = useQueryParams();

        return {
          txHash: queryParams.get('txHash') ?? undefined,
          token: queryParams.get('token') ?? undefined,
          amount: queryParams.get('amount') ?? undefined,
        };
      },
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

const UnstakeEthereum = loadComponent(() =>
  import('./screens/UnstakeEthereum').then(module => module.UnstakeEthereum),
);

const UnstakeEthereumSteps = loadComponent(() =>
  import('./screens/UnstakeEthereumSteps').then(
    module => module.UnstakeEthereumSteps,
  ),
);

export function getRoutes(): JSX.Element {
  return (
    <Route
      path={[
        RoutesConfig.root,
        RoutesConfig.claim.path,
        RoutesConfig.unstake.path,
      ]}
    >
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.stakeSteps.path}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>

        {featuresConfig.isETHUnstakeActive && (
          <GuardETHRoute
            exact
            availableNetworks={ETH_STAKING_NETWORKS}
            path={RoutesConfig.unstake.path}
          >
            <DefaultLayout>
              <UnstakeEthereum />
            </DefaultLayout>
          </GuardETHRoute>
        )}

        {featuresConfig.isETHUnstakeActive && (
          <GuardETHRoute
            exact
            availableNetworks={ETH_STAKING_NETWORKS}
            path={RoutesConfig.unstakeSteps.path}
          >
            <DefaultLayout>
              <UnstakeEthereumSteps />
            </DefaultLayout>
          </GuardETHRoute>
        )}

        <GuardETHRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.claim.path}
        >
          <DefaultLayout>
            <Claim />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.claimSteps.path}
        >
          <DefaultLayout>
            <ClaimSteps />
          </DefaultLayout>
        </GuardETHRoute>

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}