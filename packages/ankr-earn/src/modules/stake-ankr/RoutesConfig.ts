import { generatePath } from 'react-router-dom';

import { STAKING_PATH } from '../common/const';
import { useQueryParams } from '../router/hooks/useQueryParams';
import { createRouteConfig } from '../router/utils/createRouteConfig';

const ROOT = `${STAKING_PATH}ankr-stake/`;
const ANKR_PROVIDERS_PATH = `${ROOT}providers/`;
const STAKE_PATH = `${ROOT}stake/`;
const RESTAKE_PATH = `${ROOT}restake/`;
const RESTAKE_WITH_PROVIDER_PATH = `${RESTAKE_PATH}?provider=:provider?`;
const CLAIM_ALL_UNSTAKES_PATH = `${ROOT}claim-all-unstakes/`;
const CLAIM_UNSTAKES_PATH = `${ROOT}claim-unstakes/`;
const CLAIM_UNSTAKES_WITH_PROVIDER_PATH = `${CLAIM_UNSTAKES_PATH}?provider=:provider?`;
const CLAIM_ALL_REWARDS_PATH = `${ROOT}claim-all-rewards/`;
const CLAIM_REWARDS_PATH = `${ROOT}claim-rewards/`;
const CLAIM_REWARDS_WITH_PROVIDER_PATH = `${CLAIM_REWARDS_PATH}?provider=:provider?`;
const UNSTAKE_PATH = `${ROOT}unstake/`;
const UNSTAKE_WITH_PROVIDER_PATH = `${UNSTAKE_PATH}?provider=:provider?`;
const STAKE_WITH_PROVIDER_PATH = `${STAKE_PATH}?provider=:provider?`;
const STEPS_STAKE_PATH = `${STAKE_PATH}steps/:txHash/`;
const STEPS_UNSTAKE_PATH = `${UNSTAKE_PATH}steps/:txHash/`;
const STEPS_CLAIM_UNSTAKES_PATH = `${CLAIM_UNSTAKES_PATH}steps/:txHash/`;
const STEPS_CLAIM_REWARDS_PATH = `${CLAIM_REWARDS_PATH}steps/:txHash/`;
const SELECT_PROVIDER_PATH = `${STAKE_PATH}select-provider/`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },

    providers: {
      path: ANKR_PROVIDERS_PATH,
      generatePath: () => generatePath(ANKR_PROVIDERS_PATH),
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

    restake: {
      path: RESTAKE_PATH,
      generatePath: (provider: string) =>
        generatePath(RESTAKE_WITH_PROVIDER_PATH, { provider }),
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    claimUnstakes: {
      path: CLAIM_UNSTAKES_PATH,
      generatePath: (provider: string) =>
        generatePath(CLAIM_UNSTAKES_WITH_PROVIDER_PATH, { provider }),
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    claimAllUnstakes: {
      path: CLAIM_ALL_UNSTAKES_PATH,
      generatePath: () => generatePath(CLAIM_ALL_UNSTAKES_PATH),
    },

    claimRewards: {
      path: CLAIM_REWARDS_PATH,
      generatePath: (provider: string) =>
        generatePath(CLAIM_REWARDS_WITH_PROVIDER_PATH, { provider }),
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    claimAllRewards: {
      path: CLAIM_ALL_REWARDS_PATH,
      generatePath: () => generatePath(CLAIM_ALL_REWARDS_PATH),
    },

    claimUnstakesSteps: {
      path: STEPS_CLAIM_UNSTAKES_PATH,
      generatePath: (options: { txHash: string }) =>
        generatePath(STEPS_CLAIM_UNSTAKES_PATH, options),
    },

    claimRewardsSteps: {
      path: STEPS_CLAIM_REWARDS_PATH,
      generatePath: (options: { txHash: string }) =>
        generatePath(STEPS_CLAIM_REWARDS_PATH, options),
    },

    unstake: {
      path: UNSTAKE_PATH,
      generatePath: (provider: string) =>
        generatePath(UNSTAKE_WITH_PROVIDER_PATH, { provider }),
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    unstakeSteps: {
      path: STEPS_UNSTAKE_PATH,
      generatePath: (options: { txHash: string }) =>
        generatePath(STEPS_UNSTAKE_PATH, options),
    },

    selectProvider: {
      path: SELECT_PROVIDER_PATH,
      generatePath: () => generatePath(SELECT_PROVIDER_PATH),
    },
  },
  ROOT,
);
