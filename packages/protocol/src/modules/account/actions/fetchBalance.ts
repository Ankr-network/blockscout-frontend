import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';

interface IBalance {
  balance: string;
  balance_ankr: string;
  balance_usd: string;
}

export const fetchBalance = createAction<RequestAction<IBalance, BigNumber>>(
  'account/fetchBalance',
  () => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      asMutation: false,
      takeLatest: true,
      poll: 30,
      getData: (balance: IBalance) => new BigNumber(balance?.balance_ankr),
      onRequest: () => {
        return {
          promise: (async (): Promise<any> => {
            const { service } = MultiService.getInstance();

            const data = await service.getAnkrBalance();

            return data;
          })(),
        };
      },
    },
  }),
);
