import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

interface IProviderContributedArgs {
  provider: string;
}

export const getProviderContributed = createAction<
  RequestAction<BigNumber, BigNumber>,
  [IProviderContributedArgs]
>(
  `${MGNO_ACTIONS_PREFIX}getProviderContributed`,
  ({ provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await GnosisStakingSDK.getInstance();

        return sdk.getContributed(provider);
      })(),
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
