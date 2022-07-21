import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IStakingReward } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetTotalInfo {
  totalDelegatedAmount: BigNumber;
  totalRewards: BigNumber;
  claimableRewards: IStakingReward[];
}

export const getTotalInfo = createAction<
  RequestAction<IGetTotalInfo, IGetTotalInfo>
>(`${ANKR_ACTIONS_PREFIX}getTotalDelegatedAmount`, () => ({
  request: {
    promise: (async (): Promise<IGetTotalInfo> => {
      const sdk = await AnkrStakingSDK.getInstance();

      const [totalDelegatedAmount, totalRewards, claimableRewards] =
        await Promise.all([
          sdk.getTotalDelegatedAmount(),
          sdk.totalClaimableRewards(),
          sdk.getMyClaimableStakingRewards(),
        ]);

      return {
        totalDelegatedAmount,
        totalRewards,
        claimableRewards,
      };
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
