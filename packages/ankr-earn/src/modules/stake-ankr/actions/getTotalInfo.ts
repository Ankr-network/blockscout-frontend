import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IStakingReward } from '../api/AnkrStakingSDK/types';

import { selectLatestBlockNumber } from './getLatestBlockNumber';

interface IGetTotalInfo {
  totalDelegatedAmount: BigNumber;
  claimableRewards: IStakingReward[];
}

// TODO Reset on provider events: add providerTags argument
export const { useGetTotalInfoQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTotalInfo: build.query<IGetTotalInfo, void>({
      queryFn: async (args, { getState }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        const { data: latestBlockNumber } = selectLatestBlockNumber(
          getState() as RootState,
        );

        const blockNumber = latestBlockNumber ?? (await sdk.getBlockNumber());

        const [totalDelegatedAmount, claimableRewards] = await Promise.all([
          sdk.getMyTotalDelegatedAmount(blockNumber),
          sdk.getMyClaimableStakingRewards(blockNumber),
        ]);

        return {
          data: {
            totalDelegatedAmount,
            claimableRewards,
          },
        };
      },
    }),
  }),
});
