import BigNumber from 'bignumber.js';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { Balance } from './types';
import { IBalance } from 'multirpc-sdk';
import { MultiService } from 'modules/api/MultiService';

const ANKR_TO_CREDITS_RATE = 1_000_000;

const getBalance = ({
  balance,
  balance_ankr,
  balance_usd,
  balance_voucher,
}: IBalance): Balance => {
  const creditBalance = new BigNumber(balance);
  const voucherBalance = new BigNumber(balance_voucher);

  return {
    voucherBalance,
    creditBalance,
    ankrBalance: new BigNumber(balance_ankr),
    usdBalance: new BigNumber(balance_usd),
    ankrBalanceWithoutVouchers: creditBalance
      .minus(voucherBalance)
      .dividedToIntegerBy(ANKR_TO_CREDITS_RATE),
  };
};

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
