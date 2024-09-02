import { IGetRewardTxsParams, IRewardTx } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { ERewardTxsPeriod } from '../types';
import { getFromTimestampByTimePeriod } from '../utils/getFromTimestampByTimePeriod';

export interface IFetchRewardTxsParams
  extends Omit<IGetRewardTxsParams, 'from'> {
  period?: ERewardTxsPeriod;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchRewardTxs },
  useFetchRewardTxsQuery,
  useLazyFetchRewardTxsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchRewardTxs: build.query<IRewardTx[], IFetchRewardTxsParams>({
      queryFn: async ({ period, ...params }) => {
        const from = period ? getFromTimestampByTimePeriod(period) : undefined;

        const api = MultiService.getService().getAccountingGateway();
        const data = await api.getRewardTxs({ from, ...params });

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectRewardTxs,
  selectLoadingCachedByParams: selectRewardTxsLoading,
  selectStateCachedByParams: selectRewardTxsState,
} = createQuerySelectors({ endpoint: fetchRewardTxs, fallback: [] });
