import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import {
  GNO_TO_MGNO_DIVIDER,
  MGNO_ACTIONS_PREFIX,
  MGNO_TOKEN_PRICE,
} from '../const';

interface IGetANKRPrice {
  rate: number;
}

export const getMGNOPrice = createSmartAction<
  RequestAction<IGetANKRPrice, BigNumber>
>(
  `${MGNO_ACTIONS_PREFIX}getMGNOPrice`,
  (): RequestAction => ({
    request: { url: MGNO_TOKEN_PRICE },
    meta: {
      driver: 'axios',
      showNotificationOnError: false,
      getData: (data: IGetANKRPrice) =>
        new BigNumber(data.rate).dividedBy(GNO_TO_MGNO_DIVIDER),
    },
  }),
);
