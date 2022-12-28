import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getBinanceSDK } from '../utils/getBinanceSDK';

interface IFetchStakeStatsResponseData {
  relayerFee: BigNumber;
  minStake: BigNumber;
}

export const { useGetBNBStakeStatsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBStakeStats: build.query<IFetchStakeStatsResponseData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IFetchStakeStatsResponseData>(
        async () => {
          const sdk = await getBinanceSDK();

          const [minimumStake, relayerFee] = await Promise.all([
            sdk.getMinimumStake(),
            sdk.getRelayerFee(),
          ]);

          const data: IFetchStakeStatsResponseData = {
            relayerFee,
            minStake: minimumStake,
          };

          return { data };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
