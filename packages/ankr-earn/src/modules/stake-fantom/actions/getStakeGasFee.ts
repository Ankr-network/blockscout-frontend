import BigNumber from 'bignumber.js';

import { FantomSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { TFtmSyntToken } from '../types/TFtmSyntToken';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TFtmSyntToken;
}

export const { useLazyGetFTMStakeGasFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFTMStakeGasFee: build.query<BigNumber, IGetStakeGasFeeArgs>({
      queryFn: queryFnNotifyWrapper<IGetStakeGasFeeArgs, never, BigNumber>(
        async ({ amount, token }) => {
          const sdk = await FantomSDK.getInstance();

          return { data: await sdk.getStakeGasFee(amount, token) };
        },
      ),
    }),
  }),
});
