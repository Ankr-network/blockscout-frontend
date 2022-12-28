import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export interface IStakeStatsResponseData {
  minimumStake: BigNumber;
  unstakeFee: BigNumber;
}

export const { useGetMaticOnEthStakeStatsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthStakeStats: build.query<IStakeStatsResponseData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IStakeStatsResponseData>(
        async () => {
          const sdk = await getPolygonOnEthereumSDK();
          const unstakeFee = await sdk.getUnstakeFee();
          const minimumStake = await sdk.getMinimumStake();

          return {
            data: {
              minimumStake,
              unstakeFee: new BigNumber(Web3.utils.fromWei(unstakeFee)),
            },
          };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
