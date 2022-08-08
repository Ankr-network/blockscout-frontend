import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ZERO } from 'modules/common/const';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const getMaxApy = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  `${ANKR_ACTIONS_PREFIX}getMaxApy`,
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await AnkrStakingSDK.getInstance();

        const apyData = await sdk.getAPY();

        const maxApy = apyData?.sort((a, b) =>
          a.apy.isGreaterThan(b.apy) ? -1 : 1,
        );

        return maxApy[0].apy ?? ZERO;
      })(),
    },
    meta: {
      showNotificationOnError: false,
    },
  }),
);
