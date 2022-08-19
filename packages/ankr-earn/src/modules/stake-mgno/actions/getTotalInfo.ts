import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ZERO } from 'modules/common/const';

import { IStakingReward } from '../api/types';
import { MGNO_ACTIONS_PREFIX } from '../const';

interface IGetTotalInfo {
  totalDelegatedAmount: BigNumber;
  claimableRewards: IStakingReward[];
}

export const getTotalInfo = createAction<
  RequestAction<IGetTotalInfo, IGetTotalInfo>
>(`${MGNO_ACTIONS_PREFIX}getTotalInfo`, () => ({
  request: {
    promise: (async (): Promise<IGetTotalInfo> => {
      return {
        totalDelegatedAmount: ZERO.plus(19813),
        claimableRewards: [
          {
            validator: {
              validator: 'Node Provider 1',
              owner: '0xz0312bk132bhj312jvh',
              prettyStatus: ' ',
              status: ' ',
              slashesCount: 0,
              totalDelegated: ZERO,
              votingPower: 0,
              changedAt: 0,
              jailedBefore: 0,
              claimedAt: 0,
              commissionRate: ' ',
              totalRewards: ZERO,
            },
            amount: ZERO.plus(11.213),
          },
        ],
      };
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
