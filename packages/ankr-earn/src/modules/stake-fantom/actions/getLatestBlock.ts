import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { FantomSDK } from '@ankr.com/staking-sdk';

import { Seconds } from 'modules/common/types';

import { ACTIONS_PREFIX } from '../const';

const FTM_BLOCK_TIME: Seconds = 1;

export const getLatestBlock = createAction<RequestAction<number, number>>(
  `${ACTIONS_PREFIX}getLatestBlock`,
  () => ({
    request: {
      promise: (async (): Promise<number> => {
        const sdk = await FantomSDK.getInstance();

        return sdk.getLatestBlock();
      })(),
    },
    meta: {
      showNotificationOnError: true,
      cache: FTM_BLOCK_TIME,
    },
  }),
);
