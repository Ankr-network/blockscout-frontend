import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { MaticEthSDK } from '@ankr.com/staking-sdk';

import { ETH_SCALE_FACTOR } from 'modules/common/const';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

export const getAllowance = createAction<RequestAction<BigNumber, BigNumber>>(
  `${MATIC_ETH_ACTIONS_PREFIX}getAllowance`,
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await MaticEthSDK.getInstance();

        return sdk.getACAllowance();
      })(),
    },
    meta: {
      showNotificationOnError: true,
      getData: rawAllowance => rawAllowance.dividedBy(ETH_SCALE_FACTOR),
    },
  }),
);
