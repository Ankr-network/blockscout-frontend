import { BigNumber } from 'bignumber.js';
import { RootState } from 'store';

import { web3Api } from 'modules/api/web3Api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IActiveStakingData } from '../api/AnkrStakingSDK/types';
import { CacheTags } from '../cacheTags';

import { selectLatestBlockNumber } from './getLatestBlockNumber';

interface IGetActiveStakingDataArgs {
  usdPrice: BigNumber;
}

// TODO Likelly bind to the current address: add providerTags argument
export const { useGetActiveStakingDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getActiveStakingData: build.query<
      IActiveStakingData[],
      IGetActiveStakingDataArgs
    >({
      queryFn: queryFnNotifyWrapper<
        IGetActiveStakingDataArgs,
        never,
        IActiveStakingData[]
      >(async ({ usdPrice }, { getState }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        const { data: latestBlockNumber } = selectLatestBlockNumber(
          getState() as RootState,
        );

        const blockNumber = latestBlockNumber ?? (await sdk.getBlockNumber());

        return {
          data: await sdk.getMyActiveStaking(usdPrice, blockNumber),
        };
      }),
      providesTags: [CacheTags.history],
    }),
  }),
});
