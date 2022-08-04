import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetClaimableUnstakesProps {
  validator: string;
}

export const getClaimableUnstakes = createAction<
  RequestAction<BigNumber, BigNumber>
>(
  `${ANKR_ACTIONS_PREFIX}getClaimableUnstakes`,
  ({ validator }: IGetClaimableUnstakesProps) => ({
    request: {
      promise: async (): Promise<BigNumber> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.getClaimableUnstakes(validator);
      },
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
