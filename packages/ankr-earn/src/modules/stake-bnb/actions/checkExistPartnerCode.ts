import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { getBinanceSDK } from '../utils/getBinanceSDK';

interface ICheckPartnerCodeArgs {
  partnerCode: string;
}

export const { useCheckExistPartnerCodeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    checkExistPartnerCode: build.mutation<boolean, ICheckPartnerCodeArgs>({
      queryFn: queryFnNotifyWrapper<ICheckPartnerCodeArgs, never, boolean>(
        async ({ partnerCode }) => {
          const sdk = await getBinanceSDK();

          return { data: await sdk.checkExistPartnerCode(partnerCode) };
        },
      ),
    }),
  }),
});
