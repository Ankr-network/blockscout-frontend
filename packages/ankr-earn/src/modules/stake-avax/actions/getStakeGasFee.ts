import BigNumber from 'bignumber.js';

import { AvalancheSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { TAvaxSyntToken } from '../types';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TAvaxSyntToken;
}

export const { useLazyGetAVAXStakeGasFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAVAXStakeGasFee: build.query<BigNumber, IGetStakeGasFeeArgs>({
      queryFn: queryFnNotifyWrapper<IGetStakeGasFeeArgs, never, BigNumber>(
        async ({ amount, token }) => {
          const sdk = await AvalancheSDK.getInstance();

          return { data: await sdk.getStakeGasFee(amount, token) };
        },
      ),
    }),
  }),
});
