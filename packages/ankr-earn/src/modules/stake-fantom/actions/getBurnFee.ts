import BigNumber from 'bignumber.js';

import { FantomSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

export const { useLazyGetFTMBurnFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFTMBurnFee: build.query<BigNumber, BigNumber>({
      queryFn: queryFnNotifyWrapper<BigNumber, never, BigNumber>(
        async amount => {
          const sdk = await FantomSDK.getInstance();

          return { data: await sdk.getBurnFee(amount) };
        },
      ),
    }),
  }),
});
