import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetClaimableAmountDataProps {
  validator: string;
}

export const getClaimableRewards = createAction<
  RequestAction<BigNumber, BigNumber>
>(
  `${ANKR_ACTIONS_PREFIX}getClaimableRewards`,
  ({ validator }: IGetClaimableAmountDataProps) => ({
    request: {
      promise: async (): Promise<BigNumber> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.getClaimableAmount(validator);
      },
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      onRequest: withStore,
    },
  }),
);
