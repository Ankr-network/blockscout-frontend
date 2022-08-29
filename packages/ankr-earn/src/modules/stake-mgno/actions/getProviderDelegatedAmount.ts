import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

interface IGetDelegatedAmountDataProps {
  provider: string;
}

export const getProviderDelegatedAmount = createAction<
  RequestAction<BigNumber, BigNumber>
>(
  `${MGNO_ACTIONS_PREFIX}getProviderDelegatedAmount`,
  ({ provider: validator }: IGetDelegatedAmountDataProps) => ({
    request: {
      promise: async (): Promise<BigNumber> => {
        const sdk = await GnosisStakingSDK.getInstance();

        return sdk.getDelegatedAmountByProvider(validator);
      },
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      onRequest: withStore,
    },
  }),
);
