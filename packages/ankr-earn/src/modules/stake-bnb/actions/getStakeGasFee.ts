import BigNumber from 'bignumber.js';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { TBnbSyntToken } from '../types';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TBnbSyntToken;
}

export const { useLazyGetBNBStakeGasFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBStakeGasFee: build.query<BigNumber, IGetStakeGasFeeArgs>({
      queryFn: queryFnNotifyWrapper<IGetStakeGasFeeArgs, never, BigNumber>(
        async ({ amount, token }) => {
          const sdk = await BinanceSDK.getInstance();

          return { data: await sdk.getStakeGasFee(amount, token) };
        },
      ),
    }),
  }),
});
