import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ANKR_ACTIONS_PREFIX, ANKR_TOKEN_PRICE } from '../const';

interface IGetANKRPrice {
  rate: number;
}

export const getANKRPrice = createSmartAction<
  RequestAction<IGetANKRPrice, BigNumber>
>(
  `${ANKR_ACTIONS_PREFIX}getANKRPrice`,
  (): RequestAction => ({
    request: { url: ANKR_TOKEN_PRICE },
    meta: {
      driver: 'axios',
      showNotificationOnError: false,
      getData: (data: IGetANKRPrice) => new BigNumber(data.rate),
    },
  }),
);
