import BigNumber from 'bignumber.js';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';

interface IFetchPendingValuesResponseData {
  pendingAbnbbUnstakes: BigNumber;
  pendingAbnbcUnstakes: BigNumber;
}

export const { useGetBNBPendingValuesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBPendingValues: build.query<IFetchPendingValuesResponseData, void>({
      queryFn: queryFnNotifyWrapper<
        void,
        never,
        IFetchPendingValuesResponseData
      >(async () => {
        const sdk = await BinanceSDK.getInstance();

        const {
          pendingBond: pendingAbnbbUnstakes,
          pendingCertificate: pendingAbnbcUnstakes,
        } = await sdk.getPendingData();

        return {
          data: {
            pendingAbnbbUnstakes,
            pendingAbnbcUnstakes,
          },
        };
      }),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
