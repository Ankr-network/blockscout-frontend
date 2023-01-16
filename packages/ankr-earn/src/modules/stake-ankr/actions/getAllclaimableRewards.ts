import { RootState } from 'store';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IStakingReward } from '../api/AnkrStakingSDK/types';

import { selectLatestBlockNumber } from './getLatestBlockNumber';

export const {
  useLazyGetAllclaimableRewardsQuery,
  endpoints: { getAllclaimableRewards },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getAllclaimableRewards: build.query<IStakingReward[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IStakingReward[]>(
        async (_args, { getState }) => {
          const sdk = await AnkrStakingSDK.getInstance();

          const { data: latestBlockNumber } = selectLatestBlockNumber(
            getState() as RootState,
          );

          const blockNumber = latestBlockNumber ?? (await sdk.getBlockNumber());

          const data = await sdk.getMyClaimableStakingRewards(blockNumber);

          return { data };
        },
      ),
    }),
  }),
});
