import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

interface IProviderAprArgs {
  provider: string;
}

export const getApr = createAction<
  RequestAction<BigNumber, BigNumber>,
  [IProviderAprArgs]
>(
  `${MGNO_ACTIONS_PREFIX}getApr`,
  ({ provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await GnosisStakingSDK.getInstance();

        return sdk.getApr(provider);
      })(),
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
