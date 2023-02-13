import { t } from '@ankr.com/common';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

export const getBalance = createAction<RequestAction<BigNumber, BigNumber>>(
  `${MGNO_ACTIONS_PREFIX}getBalance`,
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await GnosisStakingSDK.getInstance();

        return sdk.getMgnoBalance();
      })(),
    },
    meta: {
      showNotificationOnError: true,
      additionalErrorText: t('stake-mgno.errors.balance'),
    },
  }),
);
