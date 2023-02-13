import { t } from '@ankr.com/common';
import { RootState } from 'store';

import { isWriteProvider } from '@ankr.com/provider';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IHistoryData } from '../api/AnkrStakingSDK/types';
import { CacheTags } from '../cacheTags';

import { selectLatestBlockNumber } from './getLatestBlockNumber';

export const { useGetHistoryDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getHistoryData: build.query<IHistoryData[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IHistoryData[]>(
        async (args, { getState }) => {
          const sdk = await AnkrStakingSDK.getInstance();
          const provider = await sdk.getProvider();

          if (isWriteProvider(provider)) {
            const { data: latestBlockNumber } = selectLatestBlockNumber(
              getState() as RootState,
            );
            const blockNumber =
              latestBlockNumber ?? (await sdk.getBlockNumber());

            return {
              data: await sdk.getAllEventsHistory(blockNumber),
            };
          }

          throw new Error('Current account is not defined');
        },
        getOnErrorWithCustomText(t('stake-ankr.errors.history-data')),
      ),
      providesTags: [CacheTags.history],
    }),
  }),
});
