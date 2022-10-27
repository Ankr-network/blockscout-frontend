import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetProvidersTotalInfo {
  totalTVL: BigNumber;
  totalDelegatedAmount: BigNumber;
  lockingPeriod: number;
  rewards24h: BigNumber;
  rewards30d: BigNumber;
}

// TODO Update by address change: add providerTags argument
export const { useGetProvidersTotalInfoQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getProvidersTotalInfo: build.query<IGetProvidersTotalInfo, void>({
      queryFn: async () => {
        const sdk = await AnkrStakingSDK.getInstance();
        const provider = await sdk.getProvider();

        const latestBlockNumber = await provider.getBlockNumber();

        const [
          totalTVL,
          totalDelegatedAmount,
          lockingPeriod,
          rewards24h,
          rewards30d,
        ] = await Promise.all([
          sdk.getTotalTVL(latestBlockNumber),
          sdk.getMyTotalDelegatedAmount(latestBlockNumber),
          sdk.getLockingPeriodDays(latestBlockNumber),
          sdk.getRewards(24),
          sdk.getRewards(24 * 30),
        ]);

        return {
          data: {
            totalTVL,
            totalDelegatedAmount,
            lockingPeriod,
            rewards24h,
            rewards30d,
          },
        };
      },
    }),
  }),
});
