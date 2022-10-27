import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IStakingReward } from '../api/AnkrStakingSDK/types';

interface IGetTotalInfo {
  totalDelegatedAmount: BigNumber;
  claimableRewards: IStakingReward[];
}

// TODO Reset on provider events: add providerTags argument
export const { useGetTotalInfoQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTotalInfo: build.query<IGetTotalInfo, void>({
      queryFn: async () => {
        const sdk = await AnkrStakingSDK.getInstance();
        const provider = await sdk.getProvider();
        const latestBlockNumber = await provider.getBlockNumber();

        const [totalDelegatedAmount, claimableRewards] = await Promise.all([
          sdk.getMyTotalDelegatedAmount(latestBlockNumber),
          sdk.getMyClaimableStakingRewards(),
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
