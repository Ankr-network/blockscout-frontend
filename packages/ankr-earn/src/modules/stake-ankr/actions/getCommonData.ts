import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { WalletCacheTags } from 'modules/common/const';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetCommonData {
  ankrBalance: BigNumber;
  minStake: BigNumber;
  lockingPeriod: number;
}

// TODO Reset on provider events: add providerTags argument
export const { useGetCommonDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getCommonData: build.query<IGetCommonData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetCommonData>(
        async () => {
          const sdk = await AnkrStakingSDK.getInstance();
          const provider = await sdk.getProvider();

          const [ankrBalance, minStake, lockingPeriod] = await Promise.all([
            sdk.getAnkrBalance(),
            sdk.getMinimumStake(),
            sdk.getLockingPeriodDays(await provider.getBlockNumber()),
          ]);

          return { data: { ankrBalance, minStake, lockingPeriod } };
        },
        error =>
          getExtendedErrorText(error, t('stake-ankr.errors.common-data')),
      ),
      providesTags: [WalletCacheTags.account],
    }),
  }),
});