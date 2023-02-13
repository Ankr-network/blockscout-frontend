import BigNumber from 'bignumber.js';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

export const { useLazyGetABRatioQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getABRatio: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await PolygonOnPolygonSDK.getInstance();

        const result = await sdk.getABRatio();

        return { data: result };
      }),
    }),
  }),
});
