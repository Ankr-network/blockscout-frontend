import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { configFromEnv } from 'modules/api/config';
import { currentEnv } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { sleep } from 'modules/common/utils/sleep';

const isDevEnv = currentEnv !== Env.Production;
const baseURL = configFromEnv(Env.Production).gatewayConfig.baseUrl;
const REWARD_PROVIDER_URL = 'v1alpha/reward/provider';

interface IGetRewardsResponce {
  rewards: number;
}

// We use mock because this API endpoint does not work
// on dev and goerli environments
const providerRewardsMock: IGetRewardsResponce = {
  rewards: 8.789532782,
};

export const getRewards = createAction<
  RequestAction<IGetRewardsResponce, BigNumber>,
  [string]
>('provider/getRewards', userAddress => ({
  request: isDevEnv
    ? {
        promise: (async (): Promise<IGetRewardsResponce> => {
          await sleep(3000);
          return providerRewardsMock;
        })(),
      }
    : {
        baseURL,
        method: 'get',
        url: `${REWARD_PROVIDER_URL}/${userAddress}`,
      },
  meta: {
    driver: isDevEnv ? undefined : 'axios',
    getData: ({ rewards }: IGetRewardsResponce) => {
      return new BigNumber(rewards);
    },
  },
}));
