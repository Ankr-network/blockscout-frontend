import BigNumber from 'bignumber.js';

import { AvalancheSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';

export interface IFetchStatsResponseData {
  aAVAXbBalance: BigNumber;
  aAVAXcBalance: BigNumber;
  avaxBalance: BigNumber;
  minimumStake: BigNumber;
  aAVAXcRatio: BigNumber;
}

export const { useGetAVAXCommonDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAVAXCommonData: build.query<IFetchStatsResponseData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IFetchStatsResponseData>(
        async () => {
          const sdk = await AvalancheSDK.getInstance();

          const [
            aAVAXbBalance,
            aAVAXcBalance,
            avaxBalance,
            minimumStake,
            ratio,
          ] = await Promise.all([
            sdk.getABBalance(),
            sdk.getACBalance(),
            sdk.getAVAXBalance(),
            sdk.getMinimumStake(),
            sdk.getACRatio(),
          ]);

          return {
            data: {
              aAVAXbBalance,
              aAVAXcBalance,
              avaxBalance,
              minimumStake,
              aAVAXcRatio: ratio,
            },
          };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
