import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IUnstakingData } from '../api/AnkrStakingSDK/types';
import { CacheTags } from '../cacheTags';

import { selectLatestBlockNumber } from './getLatestBlockNumber';

interface IGetUnstakingDataArgs {
  usdPrice: BigNumber;
}

// TODO Likelly bind to the current address: add providerTags argument
export const { useGetUnstakingDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getUnstakingData: build.query<IUnstakingData[], IGetUnstakingDataArgs>({
      queryFn: queryFnNotifyWrapper<
        IGetUnstakingDataArgs,
        never,
        IUnstakingData[]
      >(
        async ({ usdPrice }, { getState }) => {
          const sdk = await AnkrStakingSDK.getInstance();

          const { data: latestBlockNumber } = selectLatestBlockNumber(
            getState() as RootState,
          );

          const blockNumber = latestBlockNumber ?? (await sdk.getBlockNumber());

          return { data: await sdk.getUnstaking(usdPrice, blockNumber) };
        },
        error =>
          getExtendedErrorText(error, t('stake-ankr.errors.unstaking-data')),
      ),
      providesTags: [CacheTags.history],
    }),
  }),
});
