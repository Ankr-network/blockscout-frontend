import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

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
      queryFn: queryFnNotifyWrapper<void, never, IGetProvidersTotalInfo>(
        async () => {
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
            sdk.getTotalTVL(),
            sdk.getMyTotalDelegatedAmount(),
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
        error =>
          getExtendedErrorText(
            error,
            t('stake-ankr.errors.providers-total-info'),
          ),
      ),
    }),
  }),
});
