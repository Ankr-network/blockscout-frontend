import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';

export const fetchBalance = createAction<RequestAction<string, BigNumber>>(
  'account/fetchBalance',
  () => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      asMutation: false,
      takeLatest: true,
      poll: 30,
      getData: (balance: string) => new BigNumber(balance),
      onRequest: () => {
        return {
          promise: (async (): Promise<string> => {
            const { service } = MultiService.getInstance();

            const data = await service.getAnkrBalance();

            return data.balance;
          })(),
        };
      },
    },
  }),
);
