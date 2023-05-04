import BigNumber from 'bignumber.js';
import { IApiUserGroupParams, IBalance } from 'multirpc-sdk';

import { Balance } from './types';
import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { authorizationGuard } from 'domains/auth/utils/authorizationGuard';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

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

export const {
  endpoints: { accountFetchBalance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchBalance: build.query<Balance, IApiUserGroupParams>({
      queryFn: createNotifyingQueryFn(async ({ group }, { getState }) => {
        await authorizationGuard(getState as GetState);

        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .getAnkrBalance({ group });

        const balance = getBalance(data);

        return { data: balance };
      }),
    }),
  }),
});
