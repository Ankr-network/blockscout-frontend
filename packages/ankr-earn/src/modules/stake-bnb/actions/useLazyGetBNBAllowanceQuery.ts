import BigNumber from 'bignumber.js';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

export const {
  useLazyGetBNBAllowanceQuery,
  endpoints: { getBNBAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBAllowance: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await BinanceSDK.getInstance();

        return { data: await sdk.getACAllowance() };
      }),
    }),
  }),
});
