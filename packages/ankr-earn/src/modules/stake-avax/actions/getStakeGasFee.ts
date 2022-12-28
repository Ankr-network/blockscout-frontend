import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { TAvaxSyntToken } from '../types';
import { getAvalancheSDK } from '../utils/getAvalancheSDK';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TAvaxSyntToken;
}

export const { useLazyGetAVAXStakeGasFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAVAXStakeGasFee: build.query<BigNumber, IGetStakeGasFeeArgs>({
      queryFn: queryFnNotifyWrapper<IGetStakeGasFeeArgs, never, BigNumber>(
        async ({ amount, token }) => {
          const sdk = await getAvalancheSDK();

          return { data: await sdk.getStakeGasFee(amount, token) };
        },
      ),
    }),
  }),
});
