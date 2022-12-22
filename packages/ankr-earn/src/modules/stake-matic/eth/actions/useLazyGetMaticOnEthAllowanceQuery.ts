import BigNumber from 'bignumber.js';

import { PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

export const {
  useLazyGetMaticOnEthAllowanceQuery,
  endpoints: { getMaticOnEthAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthAllowance: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await PolygonOnEthereumSDK.getInstance();

        return { data: await sdk.getACAllowance() };
      }),
    }),
  }),
});

export const selectMaticOnEthAllowance = getMaticOnEthAllowance.select();
