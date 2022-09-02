import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

interface IGetRewardsArgs {
  provider: string;
}

export const getMyTipRewards = createAction<
  RequestAction<BigNumber, BigNumber>,
  [IGetRewardsArgs]
>(
  `${MGNO_ACTIONS_PREFIX}getMyTipRewards`,
  ({ provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await GnosisStakingSDK.getInstance();

        return sdk.getTipRewards(provider);
      })(),
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
