import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

interface IMaxStakeArgs {
  provider: string;
}

export const getMaxStakeAmount = createAction<
  RequestAction<BigNumber, BigNumber>,
  [IMaxStakeArgs]
>(
  `${MGNO_ACTIONS_PREFIX}getMaxStakeAmount`,
  ({ provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await GnosisStakingSDK.getInstance();

        return sdk.getMaxStake(provider);
      })(),
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
