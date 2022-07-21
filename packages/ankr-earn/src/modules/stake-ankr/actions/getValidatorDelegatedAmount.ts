import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetDelegatedAmountDataProps {
  validator: string;
}

export const getValidatorDelegatedAmount = createAction<
  RequestAction<BigNumber, BigNumber>
>(
  `${ANKR_ACTIONS_PREFIX}getValidatorDelegatedAmount`,
  ({ validator }: IGetDelegatedAmountDataProps) => ({
    request: {
      promise: async (): Promise<BigNumber> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.getDelegatedAmountByValidator(validator);
      },
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      onRequest: withStore,
    },
  }),
);
