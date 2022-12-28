import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { TFtmSyntToken } from '../types/TFtmSyntToken';
import { getFantomSDK } from '../utils/getFantomSDK';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TFtmSyntToken;
}

export const { useLazyGetFTMStakeGasFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFTMStakeGasFee: build.query<BigNumber, IGetStakeGasFeeArgs>({
      queryFn: queryFnNotifyWrapper<IGetStakeGasFeeArgs, never, BigNumber>(
        async ({ amount, token }) => {
          const sdk = await getFantomSDK();

          return { data: await sdk.getStakeGasFee(amount, token) };
        },
      ),
    }),
  }),
});
