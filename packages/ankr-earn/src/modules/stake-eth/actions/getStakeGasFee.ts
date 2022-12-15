import BigNumber from 'bignumber.js';

import { EthereumSDK, TEthToken } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TEthToken;
}

export const { useLazyGetETHStakeGasFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHStakeGasFee: build.query<BigNumber, IGetStakeGasFeeArgs>({
      queryFn: queryFnNotifyWrapper<IGetStakeGasFeeArgs, never, BigNumber>(
        async ({ amount, token }) => {
          const sdk = await EthereumSDK.getInstance();

          return { data: await sdk.getStakeGasFee(amount, token) };
        },
      ),
    }),
  }),
});
