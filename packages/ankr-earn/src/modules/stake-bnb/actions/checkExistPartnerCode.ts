import { BinanceSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

interface ICheckPartnerCodeArgs {
  partnerCode: string;
}

export const { useCheckExistPartnerCodeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    checkExistPartnerCode: build.mutation<boolean, ICheckPartnerCodeArgs>({
      queryFn: queryFnNotifyWrapper<ICheckPartnerCodeArgs, never, boolean>(
        async ({ partnerCode }) => {
          const sdk = await BinanceSDK.getInstance();

          return { data: await sdk.checkExistPartnerCode(partnerCode) };
        },
      ),
    }),
  }),
});
