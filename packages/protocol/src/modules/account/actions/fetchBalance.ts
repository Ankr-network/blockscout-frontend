import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';

export const fetchBalance = createAction<RequestAction<string, BigNumber>>(
  'account/fetchBalance',
  () => ({
    request: {
      promise: (async (): Promise<string> => {
        const { service } = MultiService.getInstance();

        const data = await service.getAnkrBalance();

        return data.balance;
      })(),
    },
    meta: {
      asMutation: false,
      takeLatest: false,
      cache: false,
      getData: (balance: string) => new BigNumber(balance),
    },
  }),
);
