import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IStakingReward } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetTotalInfo {
  totalDelegatedAmount: BigNumber;
  claimableRewards: IStakingReward[];
}

export const getTotalInfo = createAction<
  RequestAction<IGetTotalInfo, IGetTotalInfo>
>(`${ANKR_ACTIONS_PREFIX}getTotalInfo`, () => ({
  request: {
    promise: (async (): Promise<IGetTotalInfo> => {
      const sdk = await AnkrStakingSDK.getInstance();

      const [totalDelegatedAmount, claimableRewards] = await Promise.all([
        sdk.getTotalDelegatedAmount(),
        sdk.getMyClaimableStakingRewards(),
      ]);

      return {
        totalDelegatedAmount,
        claimableRewards,
      };
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
