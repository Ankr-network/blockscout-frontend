import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ZERO } from 'modules/common/const';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

export const getTVL = createAction<RequestAction<BigNumber, BigNumber>>(
  `${MGNO_ACTIONS_PREFIX}getTVL`,
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await GnosisStakingSDK.getInstance();
        const providersStakedData = await sdk.getProvidersStakedAvailable();
        return providersStakedData.totalStaked.reduce(
          (acc, staked) => acc.plus(staked),
          ZERO,
        );
      })(),
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
