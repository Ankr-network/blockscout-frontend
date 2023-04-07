import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { BridgeSDK } from '../api/BridgeSDK';

export const {
  useLazyGetBridgeAllowanceQuery,
  endpoints: { getBridgeAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getBridgeAllowance: build.query<BigNumber, string>({
      queryFn: queryFnNotifyWrapper<string, never, BigNumber>(
        async tokenAddress => {
          const sdk = await BridgeSDK.getInstance();
          const result = await sdk.getAllowance(tokenAddress);

          return { data: result };
        },
      ),
    }),
  }),
});
