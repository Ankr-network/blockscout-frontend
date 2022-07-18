import BigNumber from 'bignumber.js';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { Balance } from './types';
import { IBalance } from 'multirpc-sdk';
import { MultiService } from 'modules/api/MultiService';

const getBalance = ({
  balance,
  balance_ankr,
  balance_usd,
}: IBalance): Balance => ({
  ankrBalance: new BigNumber(balance_ankr),
  creditBalance: new BigNumber(balance),
  usdBalance: new BigNumber(balance_usd),
});

export const fetchBalance = createAction<RequestAction<IBalance, Balance>>(
  'account/fetchBalance',
  () => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      asMutation: false,
      takeLatest: true,
      poll: 30,
      getData: getBalance,
      onRequest: () => ({
        promise: (async (): Promise<IBalance> => {
          const service = await MultiService.getInstance();

          const data = await service.getAnkrBalance();

          return data;
        })(),
      }),
    },
  }),
);
