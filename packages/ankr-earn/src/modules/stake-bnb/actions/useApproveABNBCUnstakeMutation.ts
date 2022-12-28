import BigNumber from 'bignumber.js';

import { IWeb3SendResult } from '@ankr.com/provider';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ETH_SCALE_FACTOR } from 'modules/common/const';

import { getBinanceSDK } from '../utils/getBinanceSDK';

export const { useApproveABNBCUnstakeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    approveABNBCUnstake: build.mutation<IWeb3SendResult | boolean, BigNumber>({
      queryFn: queryFnNotifyWrapper<
        BigNumber,
        never,
        IWeb3SendResult | boolean
      >(async amount => {
        const sdk = await getBinanceSDK();

        const data = await sdk.approveACForAB(amount, ETH_SCALE_FACTOR);

        await data?.receiptPromise;

        return { data: data || true };
      }),
    }),
  }),
});
