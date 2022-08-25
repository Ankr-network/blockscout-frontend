import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { ZERO } from 'modules/common/const';

import { IActiveStakingData } from '../api/GnosisStakingSDK/types';
import { MGNO_ACTIONS_PREFIX } from '../const';

const DEMO_DATA: IActiveStakingData[] = [
  {
    provider: 'Node Provider 1',
    apr: ZERO,
    isUnlocked: false,
    slashingProtection: 98,
    stakeAmount: ZERO.plus(12),
    usdStakeAmount: ZERO.plus(1),
    rewards: ZERO,
    usdRewards: ZERO,
    status: 1,
  },
  {
    provider: 'Node Provider 2',
    apr: ZERO,
    isUnlocked: true,
    slashingProtection: 78,
    stakeAmount: ZERO.plus(1323),
    usdStakeAmount: ZERO.plus(41),
    rewards: ZERO,
    usdRewards: ZERO,
    status: 2,
  },
];

export const getActiveStakingData = createAction<
  RequestAction<IActiveStakingData[], IActiveStakingData[]>
>(`${MGNO_ACTIONS_PREFIX}getActiveStakingData`, () => ({
  request: {
    promise: (async (): Promise<IActiveStakingData[]> => {
      return DEMO_DATA;
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
