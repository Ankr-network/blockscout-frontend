import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';

const timeout = () => new Promise(res => setTimeout(res, 500));

export const fetchBalance = createAction<RequestAction<BigNumber, BigNumber>>(
  'account/fetchBalance',
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const { service } = MultiService.getInstance();

        /*
         * TODO: wait for connect
         **/
        await timeout();

        const balance = await service.getCurrentAnkrBalance();

        return balance;
      })(),
    },
    meta: {
      asMutation: false,
      takeLatest: false,
      cache: false,
    },
  }),
);
