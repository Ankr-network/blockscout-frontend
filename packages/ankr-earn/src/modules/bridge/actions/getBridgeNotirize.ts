import retry, { Options } from 'async-retry';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { SupportedChainIDS } from 'modules/common/const';

import { BridgeSDK } from '../api/BridgeSDK';
import { IBridgeNotarizeResponse } from '../api/types';
import { BridgeCacheTags } from '../const';

interface INotirize {
  transactionHash: string;
  chainIdFrom: SupportedChainIDS;
}

export const { useGetBridgeNotirizeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBridgeNotirize: build.query<IBridgeNotarizeResponse, INotirize>({
      queryFn: queryFnNotifyWrapper<INotirize, never, IBridgeNotarizeResponse>(
        async ({ transactionHash, chainIdFrom }) => {
          const sdk = await BridgeSDK.getInstance();

          const retryParams: Options = {
            retries: 30,
            factor: 1,
            minTimeout: 10000,
          };

          const response = await retry(
            async () => sdk.notarize(transactionHash, chainIdFrom),
            retryParams,
          );

          return {
            data: response.data,
          };
        },
      ),
      providesTags: [BridgeCacheTags.notirize],
    }),
  }),
});
