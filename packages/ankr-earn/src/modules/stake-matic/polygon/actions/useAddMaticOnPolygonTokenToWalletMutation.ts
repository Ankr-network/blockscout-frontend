import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { CacheTags } from '../const';

export const { useAddMaticOnPolygonTokenToWalletMutation } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      addMaticOnPolygonTokenToWallet: build.mutation<boolean, TMaticSyntToken>({
        queryFn: queryFnNotifyWrapper<TMaticSyntToken, never, boolean>(
          async token => {
            const sdk = await PolygonOnPolygonSDK.getInstance();
            return { data: await sdk.addTokenToWallet(token) };
          },
        ),
        invalidatesTags: [CacheTags.common],
      }),
    }),
  });
