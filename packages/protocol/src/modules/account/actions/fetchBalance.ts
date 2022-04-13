import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';

export const fetchBalance = createAction<RequestAction<BigNumber>>(
  'account/fetchBalance',
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const { service } = MultiService.getInstance();

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
