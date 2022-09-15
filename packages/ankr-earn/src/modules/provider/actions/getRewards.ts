import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

const REWARD_PROVIDER_URL = 'v1alpha/reward/provider';

interface IGetRewardsResponce {
  rewards: number;
}

export const getRewards = createAction<
  RequestAction<IGetRewardsResponce, BigNumber>,
  [string]
>('provider/getRewards', userAddress => ({
  request: {
    method: 'get',
    url: `${REWARD_PROVIDER_URL}/${userAddress}`,
  },
  meta: {
    driver: 'axios',
    getData: ({ rewards }: IGetRewardsResponce) => {
      return new BigNumber(rewards);
    },
  },
}));
