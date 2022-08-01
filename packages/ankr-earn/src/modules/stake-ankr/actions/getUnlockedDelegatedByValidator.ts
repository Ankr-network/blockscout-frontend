import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetUndelegatedAmountDataProps {
  validator: string;
}

export const getUnlockedDelegatedByValidator = createAction<
  RequestAction<BigNumber, BigNumber>
>(
  `${ANKR_ACTIONS_PREFIX}getUnlockedDelegatedByValidator`,
  ({ validator }: IGetUndelegatedAmountDataProps) => ({
    request: {
      promise: async (): Promise<BigNumber> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.getUnlockedDelegatedByValidator(validator);
      },
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
