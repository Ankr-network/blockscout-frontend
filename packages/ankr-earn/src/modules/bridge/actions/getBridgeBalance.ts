import retry from 'async-retry';
import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { BridgeSDK } from '../api/BridgeSDK';
import { AvailableBridgeTokens } from '../types';
import { getTokenAddr } from '../utils/getTokenAddr';

export interface IBridgeFetchBalanceArgs {
  token: AvailableBridgeTokens;
  network: number;
}

export const { useLazyGetBridgeBalanceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBridgeBalance: build.query<BigNumber, IBridgeFetchBalanceArgs>({
      queryFn: queryFnNotifyWrapper<IBridgeFetchBalanceArgs, never, BigNumber>(
        async ({ token, network }) => {
          const sdk = await BridgeSDK.getInstance();
          const tokenAddr = getTokenAddr(token, network);
          const balance = await retry(
            () => sdk.getBalance(tokenAddr, network),
            {
              retries: 1,
              minTimeout: 500,
            },
          );

          console.log(
            '@@@@@@@@@@getBridgeBalance',
            token,
            network,
            balance.toString(),
          );

          return {
            data: balance,
          };
        },
      ),
    }),
  }),
});
