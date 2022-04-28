import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { Balances } from './types';
import { IBalance } from 'multirpc-sdk';
import { MultiService } from 'modules/api/MultiService';

const getBalances = ({
  balance,
  balance_ankr,
  balance_usd,
}: IBalance): Balances => ({
  ankrBalance: new BigNumber(balance_ankr),
  creditBalance: new BigNumber(balance),
  usdBalance: new BigNumber(balance_usd),
});

export const fetchBalances = createAction<RequestAction<IBalance, Balances>>(
  'account/fetchBalances',
  () => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      asMutation: false,
      takeLatest: true,
      poll: 30,
      getData: getBalances,
      onRequest: () => {
        return {
          promise: (async (): Promise<IBalance> => {
            const { service } = MultiService.getInstance();

            const data = await service.getAnkrBalance();

            return data;
          })(),
        };
      },
    },
  }),
);
