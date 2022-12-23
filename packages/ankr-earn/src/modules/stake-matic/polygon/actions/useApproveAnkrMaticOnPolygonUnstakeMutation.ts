import BigNumber from 'bignumber.js';

import { IWeb3SendResult } from '@ankr.com/provider';
import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

export const { useApproveAnkrMaticOnPolygonUnstakeMutation } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      approveAnkrMaticOnPolygonUnstake: build.mutation<
        IWeb3SendResult | boolean,
        BigNumber
      >({
        queryFn: queryFnNotifyWrapper<BigNumber, never, boolean>(
          async amount => {
            const sdk = await PolygonOnPolygonSDK.getInstance();

            return { data: await sdk.approveACToken(amount) };
          },
        ),
      }),
    }),
  });
