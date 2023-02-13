import BigNumber from 'bignumber.js';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

export const {
  useLazyGetMaticOnPolygonAllowanceQuery,
  endpoints: { getMaticOnPolygonAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnPolygonAllowance: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await PolygonOnPolygonSDK.getInstance();

        return { data: await sdk.getACAllowance() };
      }),
    }),
  }),
});

export const selectMaticOnPolygonAllowance =
  getMaticOnPolygonAllowance.select();
