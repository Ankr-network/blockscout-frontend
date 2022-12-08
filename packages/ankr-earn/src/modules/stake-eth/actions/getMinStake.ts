import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthereumSDK } from '@ankr.com/staking-sdk';

import { ETH_ACTIONS_PREFIX } from '../const';

export const getMinStake = createAction<RequestAction<BigNumber, BigNumber>>(
  `${ETH_ACTIONS_PREFIX}getMinStake`,
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await EthereumSDK.getInstance();

        return sdk.getMinimumStake();
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
    },
  }),
);
